/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package up_1;

import java.io.FileNotFoundException;
import java.io.IOException;
/**
 *
 * @author alexey
 */
public class UP_1 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        Work myJuices = new Work();
        try {

            myJuices.readJuices("juice.in");
            myJuices.writeAllComponents();
            myJuices.sorting();
            myJuices.setPriority();
            myJuices.washing();
            

        } catch (IOException e) {
            System.out.println(e);
        } catch (InterruptedException ie) {
            System.out.println(ie);
        }
    }
    
}
