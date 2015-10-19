package hftl.dwi.se.fridgeapp.Activities;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import hftl.dwi.se.fridgeapp.R;

public class MainActivity extends AppCompatActivity {

    ListView listview;
    final ArrayList<String> list = new ArrayList<String>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        listview = (ListView) findViewById(R.id.listView);

        String[] values = new String[]{"Test","Test","Test","Test","Test","Test","Test","Test"};

        for (int i = 0; i < values.length; ++i) {
            list.add(values[i]);
        }
        final ArrayAdapter<String> adapter=new ArrayAdapter<String>(this,
                android.R.layout.simple_list_item_1,
                list);
        listview.setAdapter(adapter);


        listview.setOnItemClickListener(new AdapterView.OnItemClickListener() {

            @Override
            public void onItemClick(AdapterView<?> parent, final View view,
                                    int position, long id) {
                }
            });
        }

    public void initScan(View view) {
        IntentIntegrator integrator = new IntentIntegrator(this);
        integrator.setCaptureActivity(CaptureActivityAnyOrientation.class);
        integrator.setOrientationLocked(false);
        integrator.setPrompt(getString(R.string.activity_scannerPromptText));
        integrator.setBeepEnabled(false);
        integrator.setBarcodeImageEnabled(true);
        integrator.initiateScan();
    }

    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        //retrieve scan result
        IntentResult scanningResult = IntentIntegrator.parseActivityResult(requestCode, resultCode, intent);
        if (scanningResult.getContents() != null) {
            ((ArrayAdapter<String>) listview.getAdapter()).add(scanningResult.getContents());
        }
    }
}
