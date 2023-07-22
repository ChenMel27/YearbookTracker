package com.company;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.net.URL;
import java.net.HttpURLConnection;
import java.util.ArrayList;

public class DatabaseWriter {

    // URL of the database
    public static String dynamoURL = " https://onnbvpbl5h.execute-api.us-west-2.amazonaws.com/events";

    // Curl command
    public static String curlCmd = "curl -v -X \"PUT\" -H \"Content-Type: application/json\" -d ";

    public static void printResults(Process process) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line = "";
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }
    }

    public static boolean populateYBEvent(String s) {
        System.out.println(s);

        // Try & Catch: test errors while being executed
        try{

            // Initialize the URL
            // Add http class
            URL url = new URL(dynamoURL);
            // Open connection based URL string
            HttpURLConnection http = (HttpURLConnection)url.openConnection();
            // Put request (lambda writes new event)
            http.setRequestMethod("PUT");
            http.setDoOutput(true);
            // json string [(key:id)&(value:1)]
            http.setRequestProperty("Content-Type", "application/json");

            // Event data into new string
            String data = s;

            byte[] out = data.getBytes(StandardCharsets.UTF_8);

            // Write the data to the Yearbook API
            OutputStream stream = http.getOutputStream();
            stream.write(out);

            // Print out the response code (200 for OK, 500 for Err)
            System.out.println(http.getResponseCode() + " " + http.getResponseMessage());
            http.disconnect();
        }catch(IOException e) {
            e.printStackTrace();
        }
        return true;
    }
}


