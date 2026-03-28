package org.codingwallah.em.project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    private Long id;
    private String name;
    private String phone;
    private String email;

    // public String getName(){
    //     return name;
    // }
    // public void setName(String name){
    //     this.name = name;
    // }

    // public String getPhone(){
    //     return phone;
    // }
    // public void setPhone(String phone){
    //     this.phone = phone;
    // }

    // public String getEmail(){
    //     return email;
    // }
    // public void setEmail(String email){
    //     this.email = email;
    // }    DON'T NEED TO DO THIS BECAUSE IF U USE IT YOU HAVE TO MAKE GETTER SETTER FOR EACH AND EVERY ELEMENT SO THAT WE USE "@DATA" WHICH USES LOMBOK DEPENDENCY AND MAKE THINGS EASIER
}
