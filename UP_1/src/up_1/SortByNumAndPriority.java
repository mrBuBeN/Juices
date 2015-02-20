/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package up_1;

import java.util.Comparator;

/**
 *
 * @author alexey
 */
public class SortByNumAndPriority implements Comparator<Juice> {

    @Override
    public int compare(Juice j1, Juice j2) {
        if (j1.numOfComp != j2.numOfComp) {
            return j1.numOfComp-j2.numOfComp;
        }
        else{
            return j1.priority-j2.priority;
        }
    }

}
