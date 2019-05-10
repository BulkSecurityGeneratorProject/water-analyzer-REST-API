package com.mycompany.myapp.databaseCommunication;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mycompany.myapp.domain.Experiment;
import com.mycompany.myapp.web.rest.AnalytesOfInterestResource;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.Socket;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Base64;

@RestController
public class DatabaseCommunicator {
    private final Logger log = LoggerFactory.getLogger(AnalytesOfInterestResource.class);
    private String databaseAddress = "localhost";

    @GetMapping("/getAnalytes")
    public String getAnalytes() {
        return getter("analytes");
    }

    @GetMapping("/getBges")
    public String getBges() {
        return getter("bges");
    }

    @GetMapping("/getMatrixes")
    public String getMatrixes() {
        return getter("matrixes");
    }

    @GetMapping(path = "/postMethod")
    public void postMethod(@RequestHeader("Data") String string) {
        byte[] decodedBytes = Base64.getDecoder().decode(string);
        String decodedString = new String(decodedBytes);
        System.out.println("qweqweqe");
        System.out.println(decodedString);
    }

    @GetMapping("/getUsers")
    public String getUsers() {
        log.debug("REST request to get all users");
        ArrayList<User> lines = new ArrayList<>();
        DatabaseConnection databaseConnection = new DatabaseConnection();
        Connection connection = databaseConnection.getConnection();
        if (connection != null) {
            try {
                Statement statement = connection.createStatement();
                ResultSet set = statement.executeQuery("SELECT * FROM users;");
                while (set.next()) {
                    User user = new User();
                    user.setName(set.getString(2));
                    user.setUserClass(set.getInt(3));
                    lines.add(user);
                }
                return new Gson().toJson(lines);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } else {
            return "Database is not available right now!";
        }
        return "Works";
    }

    private String getter(String string) {
        log.debug("REST request to get all " + string);
        ArrayList<String> lines = new ArrayList<>();
        DatabaseConnection databaseConnection = new DatabaseConnection();
        Connection connection = databaseConnection.getConnection();
        if (connection != null) {
            try {
                Statement statement = connection.createStatement();
                ResultSet set = statement.executeQuery("SELECT * FROM " + string + ";");
                while (set.next()) {
                    lines.add(set.getString(2));
                }
                return new Gson().toJson(lines);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } else {
            return "Database is not available right now!";
        }
        return "Works";
    }

    public boolean isDatabaseUp() {
        boolean ret = false;
        try {
            Socket s = new Socket(databaseAddress,5432);
            ret = true;
            s.close();
        } catch (Exception e) {
            System.out.println(e);
        }
        return ret;
    }
}