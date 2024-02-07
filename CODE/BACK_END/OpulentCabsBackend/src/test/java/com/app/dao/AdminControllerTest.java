package com.app.dao;

import org.junit.jupiter.api.Test;

import site.opcab.controller.AdminController;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AdminControllerTest {

    @Test
    public void testAdminDashboard() {
        AdminController adminController = new AdminController();
        String result = adminController.adminDashboard();
        assertEquals("Welcome to Admin Dashboard!", result);
    }
}

