/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package up_1;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;
import java.util.StringTokenizer;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InterruptedIOException;
import java.io.File;
import java.io.FileWriter;

/**
 *
 * @author alexey
 */
public class Work {

    private ArrayList<String> components;
    private ArrayList<Juice> juices;

    Work() {

        components = new ArrayList<>();
        juices = new ArrayList<>();

    }

    public void readJuices(String nameOfFile) throws FileNotFoundException {

        Scanner sc = new Scanner(new File(nameOfFile));

        while (sc.hasNextLine()) {

            StringTokenizer strtok = new StringTokenizer(sc.nextLine(), " ");
            Juice drink = new Juice();

            while (strtok.hasMoreTokens()) {

                String component = strtok.nextToken();
                drink.putComponent(component);
                if (!components.contains(component)) {
                    components.add(component);
                }

            }

            juices.add(drink);

        }

    }

    public void writeAllComponents() throws IOException {

        FileWriter fw = new FileWriter(new File("juice1.out"));

        for (String str : components) {
            fw.write(str + "\r\n");
        }

        fw.close();

    }

    public void sorting() throws IOException, InterruptedException {

        FileWriter fw = new FileWriter(new File("juice2.out"));
        SortByAlphabet sortedFruits = new SortByAlphabet(components);

        Thread th = new Thread(sortedFruits);
        th.start();
        th.join();

        for (String str : sortedFruits.components) {
            fw.write(str + "\r\n");
        }

        fw.close();

    }

    public void setPriority() {

        juices.sort((a, b) -> a.numOfComp - b.numOfComp);
        
        for (int i = 0; i < juices.size(); i++) {

            int count = 0;
            Juice drink = juices.get(i);

            for (int j = i - 1; j >= 0; j--) {

                if (drink.numOfComp == juices.get(j).numOfComp + 1) {

                    if (drink.include(juices.get(j))) {
                        count++;
                    }
                } else {
                    if (drink.numOfComp > juices.get(j).numOfComp + 1) {
                        break;
                    }
                }
            }
            juices.get(i).priority = count;

        }
    }

    public void washing() throws FileNotFoundException, IOException{

        juices.sort(new SortByNumAndPriority());
        Integer countOfWash = 1;

        while (!juices.isEmpty()) {
            Juice drink = juices.remove(0);
            
            for (int i = 0; i < juices.size(); i++) {
                if (juices.get(i).include(drink)) {
                    drink = juices.remove(i);
                }
            }
            countOfWash++;
        }
        
        FileWriter fw= new FileWriter(new File("juice3.out"));
        fw.write(countOfWash.toString());
        fw.close();
    }

}
