package bakeshopsystem;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;  

public class ProductDatabase {
    
    public String getProductIDFromDatabase(String productType, String productName, String flavor) {
        String productID = "";
        String query = "";
        
        try {
           
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/bakeshopsystem", "root", "");
            
            switch (productType.toLowerCase()) {
                case "cake":
                    query = "SELECT cakeID FROM cakes WHERE cakeName = ? AND cakePrice = ?";
                    break;
                case "cupcake":
                    query = "SELECT cupcakeID FROM cupcakes WHERE cupcakeName = ? AND cupcakePrice = ?";
                    break;
                case "cookie":
                    query = "SELECT cookieID FROM cookies WHERE cookieName = ? AND cookiePrice = ?";
                    break;
                case "cheesecakes":
                    query = "SELECT cheesecakeID FROM cheesecakes WHERE cheesecakeName = ? AND cheesecakePrice = ?";
                    break;
                case "muffins":
                    query = "SELECT muffinID FROM muffins WHERE muffinName = ? AND muffinPrice = ?";
                    break;
                default:
                    return "Invalid product type!";
            }
           
            PreparedStatement pst = con.prepareStatement(query);
            pst.setString(1, productName);
            pst.setString(2, flavor);
            
            ResultSet rs = pst.executeQuery();
            if (rs.next()) {
             
                productID = rs.getString(1);  
            }
            
            rs.close();
            pst.close();
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return productID;
    }
}