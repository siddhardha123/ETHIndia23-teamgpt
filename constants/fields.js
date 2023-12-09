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
    100: 1,
    500: 2,
    1000: 3,
    2000:4,
}




module.exports = {
    Fields,
    mandatoryMap,
    xpToLevelMapping,
    mandatoryFields
}
