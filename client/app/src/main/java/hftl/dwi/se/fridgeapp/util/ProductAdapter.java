package hftl.dwi.se.fridgeapp.util;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

import hftl.dwi.se.fridgeapp.R;

/**
 * Created by Tobias on 20.10.2015.
 */
public class ProductAdapter extends ArrayAdapter<Product> {

    private final Context context;
    private final ArrayList<Product> itemsArrayList;

    public ProductAdapter(Context c,ArrayList<Product> products) {
        super(c, R.layout.rowlayout,products);

        this.context = c;
        this.itemsArrayList = products;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // 1. Create inflater
        LayoutInflater inflater = (LayoutInflater) context
                .getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        // 2. Get rowView from inflater
        View rowView = inflater.inflate(R.layout.rowlayout, parent, false);

        // 3. Get the two text view from the rowView
        TextView nameView = (TextView) rowView.findViewById(R.id.product_name);
        TextView amountView = (TextView) rowView.findViewById(R.id.product_amount);
        TextView mhdView = (TextView) rowView.findViewById(R.id.mhd);
        ImageView imageView = (ImageView) rowView.findViewById(R.id.product_thumbnail);

        // 4. Set the text for textView
        nameView.setText(itemsArrayList.get(position).getName());
        amountView.setText(Integer.toString(itemsArrayList.get(position).getAmount()));
        mhdView.setText(itemsArrayList.get(position).getMhd().toString());

        // 5. retrn rowView
        return rowView;
    }
}
