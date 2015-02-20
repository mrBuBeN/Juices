/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package up_1;
import java.util.Comparator;
import java.util.ArrayList;

/**
 *
 * @author alexey
 */
public class SortByAlphabet extends Thread {

    public ArrayList<String> components;

    SortByAlphabet(ArrayList<String> comp) {

        components = new ArrayList<>();
        for (String str : comp) {
            components.add(str);
        }

    }

    public void sortComponent() {

        components.sort(new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                return o1.compareTo(o2);
            }
        });
    }

    @Override
    public void run() {
        sortComponent();
    }
}
