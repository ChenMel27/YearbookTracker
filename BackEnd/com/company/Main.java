package com.company;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws FileNotFoundException {

        // Start ID as an Offset
        int id = 0;

        // Create new DatabaseWriter object
        DatabaseWriter db = new DatabaseWriter();

        // Create new YearbookEventParser object
        YearbookEventParser yb = new YearbookEventParser(1);

        // Retrieve text file with File I/O and new Scanner object
        Scanner input = new Scanner(new File("/Users/melaniechen/Downloads/Events.txt"));

        // (If there is a line) Parsing each line of file using while loop
        while (input.hasNextLine()) {
            // Read the next line as long as the next line exists
            String s = input.nextLine();

            // Tokenize each line based on the comma
            yb.tokenize(id, s);
            // Parse the line and populate the YearbookEvent object
            String t = yb.getYearbookEvent();
            // Populate the DynamoDb with the current Yearbook Event
            db.populateYBEvent(t);
            id++;

            //CLoses file after opening (protect)
            //input.close();
        }
    }
}