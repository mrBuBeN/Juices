/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package up_1;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;

/**
 *
 * @author alexey
 */
public class Juice {

    public ArrayList<String> components;
    public int numOfComp;
    public int priority;

    Juice() {
        components = new ArrayList<>();
        numOfComp = 0;
        priority = 0;
    }

    public void putComponent(String comp) {

        components.add(comp);
        numOfComp++;

    }

    public boolean include(Juice drink) {
        
        if (this.components.containsAll(drink.components)) {
            return true;
        } else {
            return false;
        }
    }

}
