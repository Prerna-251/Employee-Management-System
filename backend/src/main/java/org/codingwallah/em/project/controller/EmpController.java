package org.codingwallah.em.project.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.codingwallah.em.project.model.Employee;
import org.codingwallah.em.project.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;





@RestController
@CrossOrigin("http://localhost:3000/")
public class EmpController {
    
    //List<Employee> employees = new ArrayList<>();
    //EmployeeService employeeService = new EmployeeServiceImpl();
    @Autowired
    private EmployeeService employeeService;

    //Dependency Injection
    //@Autowired
    //EmployeeService employeeService;    

    @GetMapping("employees")
    public List<Employee> getAllEmployees() {
        // List<Employee> employees = new ArrayList<>();
        // Employee emp = new Employee();
        // emp.setName("Prerna");
        // emp.setPhone("8817170251");
        // emp.setEmail("prerna@02gmail.com");
        // employees.add(null);
        // employees.add(emp);
        return employeeService.readEmployees();
    }

    @GetMapping("employees/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeService.readEmployee(id);
    }
    

    @PostMapping("employees")
    public String createEmployee(@RequestBody Employee employee) {
        // employees.add(employee);
        return employeeService.createEmployee(employee);
        // return "Saved Successfully";
    }
    
    @DeleteMapping("employees/{id}")
    public String deleteEmployee(@PathVariable Long id){
        if(employeeService.deleteEmployee(id))
            return "Delete Successfully";
        return "Not found";
    }

    @PutMapping("employees/{id}")
    public String putMethodName(@PathVariable Long id, @RequestBody Employee employee) {
        return employeeService.updateEmployee(id, employee);
    }

}
