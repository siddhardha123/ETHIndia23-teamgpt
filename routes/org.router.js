const express = require('express');
const orgController = require('../controllers/org.controller');

const router = express.Router();

router.post('/orgs', orgController.createOrg);
router.get('/orgs', orgController.getAllOrgs);
router.get('/orgs/:id',orgController.getOrgById)

// rules routes
router.post('/orgs/:id/rules',orgController.saveOrUpdateRules)
router.get('/orgs/:id/rules',orgController.getLatestRulesByOrgId)

// data dump
router.post('/orgs/:id/dump',orgController.dumpUserData)

//get _id with wallet address
router.get('/orgs/id/:wallet_address',orgController.getIdWithWalletAddress)

module.exports = router;
