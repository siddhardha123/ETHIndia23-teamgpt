const Org = require('../models/org');
const Rules = require('../models/rules')
const {mandatoryMap,mandatoryFields} = require('../constants/fields')
const {getGitHubUsersInfo} = require('../services/github.service')
const {main} = require('../Web3Gates/web3rules')
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

const getIdWithWalletAddress =async(req,res) => {
  try{
       const wallet_address = req.params.wallet_address
      const existingOrg = await Org.findOne({ wallet_address });
      if(!existingOrg){
         return res.status(404).json({ success: false, message: 'no org exists with this wallet address' });
      }
      const {_id} = existingOrg
      return res.status(200).json({success:true, id :_id})
  }catch (e){
      console.error('Error fetching latest rules:', e);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

const dumpUserData = async (req,res) => {
    const {id} = req.params
    try{
        const {userData} = req.body
        const walletData = await _getWalletData(userData)
        const githubData = await _getGithubData(userData)
        res.status(200).json({walletData,githubData})
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
    try {

        const response = await fetch(process.env.GITHUB_API);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("An error occurred while fetching data:", error);
        return null;
    }
}

const _getWalletData = async(userData) => {
   let walletAdds = userData.map(user=>user.wallet_address)
    const walletData = await main(walletAdds)
    return walletData
    // console.log(walletData)

}



module.exports = {
    createOrg,
    getAllOrgs,
    saveOrUpdateRules,
    getOrgById,
    getLatestRulesByOrgId,
    dumpUserData,
    getIdWithWalletAddress
}

