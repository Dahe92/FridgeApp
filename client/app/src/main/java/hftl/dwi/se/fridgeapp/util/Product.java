package hftl.dwi.se.fridgeapp.util;

import java.sql.Date;
import java.util.Comparator;

/**
 * Created by Tobias on 17.10.2015.
 */
public class Product{

    /**
     * Comparator to sort the list of Products by name
     * usage: Collections.sort(list, Product.NAME_COMPARATOR);
     */
    public static final Comparator<Product> NAME_COMPARATOR = new Comparator<Product>() {
        public int compare(Product p1, Product p2) {
            return p1.getName().compareTo(p2.getName());
        }
    };

    /**
     * Comparator to sort the list of Products by category
     * usage: Collections.sort(list, Product.CATEGORY_COMPARATOR);
     */
    public static final Comparator<Product> CATEGORY_COMPARATOR = new Comparator<Product>() {
        public int compare(Product p1, Product p2) {
            return p1.getCategory().compareTo(p2.getCategory());
        }
    };

    /**
     * Comparator to sort the list of Products by mhd
     * usage: Collections.sort(list, Product.MHD_COMPARATOR);
     */
    public static final Comparator<Product> MHD_COMPARATOR = new Comparator<Product>() {
        public int compare(Product p1, Product p2) {
            return p1.getMhd().compareTo(p2.getMhd());
        }
    };

    private long eanId;
    private String name;
    private Date mhd;
    private String category;
    private String tag;
    private Date buyDate;
    private int amount;
    //is this specific product usable in statistics
    private boolean isInfluencingStatista;

    public Product(long eanId, String name, Date mhd, String category, String tag, Date buyDate, int amount, boolean isInfluencingStatista) {
        this.eanId = eanId;
        this.name = name;
        this.mhd = mhd;
        this.category = category;
        this.tag = tag;
        this.buyDate = buyDate;
        this.amount = amount;
        this.isInfluencingStatista = isInfluencingStatista;
    }

    public long getEanId() {
        return eanId;
    }

    public void setEanId(long eanId) {
        this.eanId = eanId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getMhd() {
        return mhd;
    }

    public void setMhd(Date mhd) {
        this.mhd = mhd;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Date getBuyDate() {
        return buyDate;
    }

    public void setBuyDate(Date buyDate) {
        this.buyDate = buyDate;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public boolean isInfluencingStatista() {
        return isInfluencingStatista;
    }

    public void setIsInfluencingStatista(boolean isInfluencingStatista) {
        this.isInfluencingStatista = isInfluencingStatista;
    }

    @Override
    public String toString() {
        return "Product{" +
                "name='" + name + '\'' +
                ", amount=" + amount +
                ", mhd=" + mhd +
                '}';
    }
}
