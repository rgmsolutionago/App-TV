package com.getcapacitor;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.os.Bundle;
import android.os.Looper;
import android.util.Log;
import android.view.KeyEvent;

import androidx.appcompat.app.AppCompatActivity;

import com.getcapacitor.android.R;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class BridgeActivity extends AppCompatActivity {

  protected Bridge bridge;
  protected boolean keepRunning = true;
  protected CapConfig config;

  protected int activityDepth = 0;
  protected List<Class<? extends Plugin>> initialPlugins = new ArrayList<>();
  protected final Bridge.Builder bridgeBuilder = new Bridge.Builder(this);

  static int cont=0;


  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    bridgeBuilder.setInstanceState(savedInstanceState);
    getApplication().setTheme(getResources().getIdentifier("AppTheme_NoActionBar", "style", getPackageName()));
    setTheme(getResources().getIdentifier("AppTheme_NoActionBar", "style", getPackageName()));
    setTheme(R.style.AppTheme_NoActionBar);
    setContentView(R.layout.bridge_layout_main);




    new Timer().scheduleAtFixedRate(new TimerTask(){
      @Override
      public void run(){
        System.out.println("Cont: "+cont);

        if(cont>=1){
          System.out.println("Restart At: "+new Date().toString());
          restartApp(getApplicationContext());
        }
        cont++;
      }
    },0,10800000);


    Thread.setDefaultUncaughtExceptionHandler(
      new Thread.UncaughtExceptionHandler() {
        @Override
        public void uncaughtException (Thread thread, Throwable e) {
               handleUncaughtException (thread, e);
        }
      });



  }
  private void handleUncaughtException (Thread thread, Throwable e) {
      this.restartApp(getApplicationContext());
  }

  static void restartApp(Context context){

    Logger.debug("App paused, key value: "+keyCodePresses);
        Logger.debug("KeyEvent.KEYCODE_BACK: "+KeyEvent.KEYCODE_BACK);

    Context ctx = context;
    PackageManager pm = ctx.getPackageManager();
    Intent intent = pm.getLaunchIntentForPackage(ctx.getPackageName());
    Intent mainIntent = Intent.makeRestartActivityTask(intent.getComponent());
    ctx.startActivity(mainIntent);
    Runtime.getRuntime().exit(0);
    Logger.debug("Reiniciando tilo");
  }

  public static void trimCache(Context context) {
    try {
      File dir = context.getCacheDir();
      deleteDir(dir);
      Logger.debug("Se borró el caché");
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public static boolean deleteDir(File dir) {
    if (dir != null && dir.isDirectory()) {
      String[] children = dir.list();
      for (int i = 0; i < children.length; i++) {
        boolean success = deleteDir(new File(dir, children[i]));
        if (!success) {
          return false;
        }
      }
      return dir.delete();
    }
    else {
      return false;
    }
  }

  protected void load() {
    Logger.debug("Starting BridgeActivity");

    bridge = bridgeBuilder.addPlugins(initialPlugins).setConfig(config).create();

    this.keepRunning = bridge.shouldKeepRunning();
    this.onNewIntent(getIntent());
  }

  public void registerPlugin(Class<? extends Plugin> plugin) {
    bridgeBuilder.addPlugin(plugin);
  }

  public void registerPlugins(List<Class<? extends Plugin>> plugins) {
    bridgeBuilder.addPlugins(plugins);
  }

  public Bridge getBridge() {
    return this.bridge;
  }

  @Override
  public void onSaveInstanceState(Bundle outState) {
    super.onSaveInstanceState(outState);
    bridge.saveInstanceState(outState);
  }

  @Override
  public void onStart() {
    super.onStart();

    if (bridge == null) {
      PluginManager loader = new PluginManager(getAssets());
      try {
        bridgeBuilder.addPlugins(loader.loadPluginClasses());
      } catch (PluginLoadException ex) {
        Logger.error("Error loading plugins.", ex);
      }
      this.load();
    }

    activityDepth++;
    this.bridge.onStart();
    Logger.debug("App started");
  }

  @Override
  public void onRestart() {
    super.onRestart();
    this.bridge.onRestart();
    Logger.debug("App restarted");
  }
  static int keyCodePresses=-1;
  @Override
  public void onResume() {
    super.onResume();
    bridge.getApp().fireStatusChange(true);
    this.bridge.onResume();
    Logger.debug("App resumed");
  }

  @Override
  public void onPause() {
    super.onPause();
    this.bridge.onPause();
    /*reinicio*/
    if(keyCodePresses!=KeyEvent.KEYCODE_BACK)
      restartApp(getApplicationContext());
  }

  public boolean onKeyDown(int keyCode, KeyEvent event) {
    keyCodePresses=KeyEvent.KEYCODE_BACK;
    if ((keyCode == KeyEvent.KEYCODE_BACK)) {
      Log.d(this.getClass().getName(), "Botón para salir presionado");
      onDestroy();
      Runtime.getRuntime().exit(0);
    }
    return super.onKeyDown(keyCode, event);
  }

  @Override
  public void onStop() {
    super.onStop();

    activityDepth = Math.max(0, activityDepth - 1);
    if (activityDepth == 0) {
      bridge.getApp().fireStatusChange(false);
    }

    this.bridge.onStop();
    Logger.debug("App stopped");
  }

  @Override
  public void onDestroy() {
    super.onDestroy();
    this.bridge.onDestroy();
    Logger.debug("App destroyed");
  }

  @Override
  public void onDetachedFromWindow() {
    super.onDetachedFromWindow();
    this.bridge.onDetachedFromWindow();
  }

  /**
   * Handles permission request results.
   *
   * Capacitor is backwards compatible such that plugins using legacy permission request codes
   * may coexist with plugins using the AndroidX Activity v1.2 permission callback flow introduced
   * in Capacitor 3.0.
   *
   * In this method, plugins are checked first for ownership of the legacy permission request code.
   * If the {@link Bridge#onRequestPermissionsResult(int, String[], int[])} method indicates it has
   * handled the permission, then the permission callback will be considered complete. Otherwise,
   * the permission will be handled using the AndroidX Activity flow.
   *
   * @param requestCode the request code associated with the permission request
   * @param permissions the Android permission strings requested
   * @param grantResults the status result of the permission request
   */
  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    if (this.bridge == null) {
      return;
    }

    if (!bridge.onRequestPermissionsResult(requestCode, permissions, grantResults)) {
      super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
  }

  /**
   * Handles activity results.
   *
   * Capacitor is backwards compatible such that plugins using legacy activity result codes
   * may coexist with plugins using the AndroidX Activity v1.2 activity callback flow introduced
   * in Capacitor 3.0.
   *
   * In this method, plugins are checked first for ownership of the legacy request code. If the
   * {@link Bridge#onActivityResult(int, int, Intent)} method indicates it has handled the activity
   * result, then the callback will be considered complete. Otherwise, the result will be handled
   * using the AndroidX Activiy flow.
   *
   * @param requestCode the request code associated with the activity result
   * @param resultCode the result code
   * @param data any data included with the activity result
   */
  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (this.bridge == null) {
      return;
    }

    if (!bridge.onActivityResult(requestCode, resultCode, data)) {
      super.onActivityResult(requestCode, resultCode, data);
    }
  }

  @Override
  protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);

    if (this.bridge == null || intent == null) {
      return;
    }

    this.bridge.onNewIntent(intent);
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);

    if (this.bridge == null) {
      return;
    }

    this.bridge.onConfigurationChanged(newConfig);
  }
}
