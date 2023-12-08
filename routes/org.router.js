const express = require('express');
const orgController = require('../controllers/org.controller');

const router = express.Router();

router.post('/orgs', orgController.createOrg);
router.get('/orgs', orgController.getAllOrgs);
router.get('/orgs/:id',orgController.getOrgById)

// rules routes
router.post('/orgs/:id/rules',orgController.saveOrUpdateRules)
router.get('/orgs/:id/rules',orgController.getLatestRulesByOrgId)
// Add other org-related routes as needed

module.exports = router;
