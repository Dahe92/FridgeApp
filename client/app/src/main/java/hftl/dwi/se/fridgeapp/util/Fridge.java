package hftl.dwi.se.fridgeapp.util;

import java.sql.Date;
import java.util.ArrayList;

/**
 * Created by Tobias on 18.10.2015.
 */
public class Fridge {

    private ArrayList<Product> content = new ArrayList<Product>();
    private Date lastSynced;

    public Fridge(ArrayList<Product> content) {
        this.content = content;
    }

    public ArrayList<Product> getContent() {
        return content;
    }

    public void setContent(ArrayList<Product> content) {
        this.content = content;
    }

    public Date getLastSynced() {
        return lastSynced;
    }

    public void setLastSynced(Date lastSynced) {
        this.lastSynced = lastSynced;
    }

    public void addProduct(Product product) {
        content.add(product);
    }

    public void removeProduct(Product product) {
        content.remove(product);
    }
}
