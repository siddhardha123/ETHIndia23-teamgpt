const Fields = {
    NO_OF_TXNS: 'no_of_transactions',
    NO_OF_NFTS : 'no_of_nfts',
    WALLET_BALANCE : 'wallet_balance',
    GITHUB_FOLLOWERS : 'github_followers',
    GITHUB_PUBLIC_REPOS : 'github_public_repos',
}

const mandatoryFields = ['mail']
//csv fields
const mandatoryMap = {
    'no_of_transactions': ['wallet_address','chain'],
    'no_of_nfts' : ['wallet_address'],
    'wallet_balance' : ['wallet_address'],
    'github_followers' : ['github_username'],
    'github_public_repos' : ['github_username'],
}

const xpToLevelMapping = {
    10: 1,
    20: 2,
    30: 3,
    40:4,
    50:5,
    60:6,
    70:7,
    80:8,
}




module.exports = {
    Fields,
    mandatoryMap,
    xpToLevelMapping,
    mandatoryFields
}
