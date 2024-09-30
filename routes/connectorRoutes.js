// routes/connectorROutes.js

const express = require('express'); 
const authMiddleware = require('../middlewares/authMiddleware'); 
const {snortScan } = require('./../controllers/snortScan');
const runNmapScans = require('../controllers/nmapScan');
const router = express.Router();

// Protect user profile route with authMiddleware
/**
 /**
 * @swagger
 * /nmap-scan:
 *   get:
 *     summary: Run Nmap Scan
 *     description: Executes an Nmap scan on a predefined target IP/hostname and returns the results.
 *     responses:
 *       200:
 *         description: Nmap scan executed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'nmap scans'
 *                 results:
 *                   type: string
 *                   example: "Nmap scan result details."
 *       500:
 *         description: Error running Nmap scan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message if something goes wrong."
 */ 

router.post('/nmap-scan', runNmapScans);
/**
 * @swagger
 * /snort-scan:
 *   get:
 *     summary: Run snort Scan
 *     description: Executes an Nmap scan on a predefined target IP/hostname and returns the results.
 *     responses:
 *       200:
 *         description: Nmap scan executed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'nmap scans'
 *                 results:
 *                   type: string
 *                   example: "Nmap scan result details."
 *       500:
 *         description: Error running Nmap scan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message if something goes wrong."
 */ 
router.post('/snort',snortScan);
module.exports = router;
