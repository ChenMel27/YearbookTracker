package com.company;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class YearbookEventParser {
    private int event_code;
    private int offset;
    private String date;
    private String event_name;
    private String location;
    private String start_time;
    private ArrayList<String> student_list;

    YearbookEventParser (int n) {
        student_list = new ArrayList<String>();
        event_code = 0;
        offset = n;
    }

    public String getYearbookEvent() {
        String s = " ";
        s += "{";

        // Add ID
        s += "\"id\":";
        s += "\"" + event_code + "\",";

        // Add name
        s += "\"name\": ";
        s += "\"" + event_name + "\",";

        //Add start time
        s += "\"begin\": ";
        s += "\"" + start_time + "\",";

        //Add date
        s += "\"date\": ";
        s += "\"" + date + "\",";

        //Add location
        s += "\"location\": ";
        s += "\"" + location + "\",";

        //Add students
        s += "\"students\" : [";
        for(int i = 0; i < student_list.size(); i++) {
            s += "\"" + student_list.get(i) + "\"";
            if(i < student_list.size()-1) {
                s += ", ";
            }
        }
        s += "]}";


        return s;
    }

    // Standard getters for class yearbook event
    public String getDate() {
        return date;
    }
    public String getEvent_name() {
        return event_name;
    }
    public String getLocation() {
        return location;
    }
    public String getStart_time() {
        return start_time;
    }
    public ArrayList<String> getStudent_list() {
        return student_list;
    }

    // Tokenize the input string from the Yearbook event file
    public void tokenize(int num, String str) {

        // Split the string based on the comma
        String[] token = str.split(",");

        student_list.clear();

        event_code = num + offset;

        // Assigning tokens into data structure of token class based on switch statement
        for (int i = 0; i < token.length; i++)
        {
            switch (i) {
                case 0: // date
                    date = token[i];
                    break;
                case 1: // name
                    event_name = token[i];
                    break;
                case 2: // location
                    location = token[i];
                    break;
                case 3: // time
                    start_time = token[i];
                    break;
            }

            // Allows more than one student
            if (i >= 4) {
                student_list.add(token[i]);
            }
        }
    }
}



