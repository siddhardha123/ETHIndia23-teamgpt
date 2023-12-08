const Org = require('../models/org');
const Rules = require('../models/rules')
const {mandatoryMap,mandatoryFields} = require('../constants/fields')
const {getGitHubUsersInfo} = require('../services/github.service')
const createOrg = async (req, res) => {
    try {
        const { name, description, social_links, profile_image, wallet_address } = req.body;

        const existingOrg = await Org.findOne({ wallet_address });

        if (existingOrg) {
            return res.status(400).json({ error: "Wallet address already exists in the database" });
        }

        const org = new Org({ name, description, social_links, profile_image, wallet_address });
        await org.save();
        res.json(org);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const  getAllOrgs = async (req, res) => {
    try {
        const orgs = await Org.find();
        res.json(orgs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrgById = async (req, res) => {
    try {
        const id = req.params.id;
        const org = await Org.findById(id);

        if (!org) {
            return res.status(404).json({ error: "Organization not found" });
        }

        res.json(org);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const saveOrUpdateRules = async (req, res) => {
    const id = req.params.id;
    const newRules = req.body.rules;
    let rulesInstance; // Declare the variable here

    try {
        const existingRules = await Rules.findOne({ org_id: id });

        if (existingRules) {
            await Rules.deleteOne({ org_id: id }); // Delete the old model
        }

        rulesInstance = new Rules({
            org_id : id,
            rules: newRules,
            is_latest: true
        });

        await rulesInstance.save();

        res.status(200).json({ message: 'Rules saved or updated successfully.', data: rulesInstance });
    } catch (error) {
        res.status(500).json(error);
    }
};

const getLatestRulesByOrgId = async (req, res) => {
    const { id } = req.params;
    try {
        const latestRules = await Rules.findOne({ org_id: id});
        if (latestRules) {
            res.status(200).json({ success: true, data: latestRules });
        } else {
            res.status(404).json({ success: false, message: 'No rules found for the organization with ID:' + orgId });
        }
    } catch (error) {
        console.error('Error fetching latest rules:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const dumpUserData = async (req,res) => {
    const {id} = req.params
    try{
       // const validatedData = _validateDumpData({id,... req.body})
        const {userData} = req.body
        const walletData = await _getWalletData(userData)
        const githubData = await _getGithubData(userData)
    }catch (error){
        res.status(500).json(error);
    }
}


// const _validateDumpData = async (dumpData) => {
//     const id = dumpData.id
//     const rulesObj = await Rules.findOne({org_id : id})
//     const userRules = rulesObj.rules;
//     let mandateArray = mandatoryFields
//     for(const key in userRules){
//         const mandatoryKeys = mandatoryMap[key]
//         mandateArray.push(...mandatoryKeys)
//     }
//
//
//
// }
const _getGithubData = async (userData) => {
    let  githubUserNames = []
    userData.forEach((user)=>{
        githubUserNames.push(user.github_username)
    })
    const data = await getGitHubUsersInfo(githubUserNames)

    return data
}

const _getWalletData = async(userData) => {

}

module.exports = {
    createOrg,
    getAllOrgs,
    saveOrUpdateRules,
    getOrgById,
    getLatestRulesByOrgId,
}

