export const BASE_URL =
    // 'http://192.168.1.203/backend_homely_food/public/api'
    'http://live.homeefoodz.com/public/api';
// "http://source.homeefoodz.com/public/api";
// "https://www.homeeplatform.com/homee_food/public/api";

export const localApiURL = 'http://localhost:7071/api/fetch?'

export const URL = {
    LOGIN: '/login',
    VERIFY_OTP: '/verify-otp',
    REGISTER: '/register',
    ADDRESS: '/address',
    USER_SUPPORT: '/user-support',
    HOME: '/home',
    COOK_PROFILE: '/cook/profile',
    SHOW_CART: '/show/cart',
    SHOW_WALLET: '/show/wallet-cart',
    ADD_CARD: '/add/cart',
    MINUS_QUANTITY: '/minus/quantity/', //ID to be passed
    CART_ITEM: '/cart_item/amount', //TO BE VERIFY AMOUNT 
    REMOVE_CART_ITEM: '/remove/cart_item/', //cart id need to pass
    EMPTY_CART: '/empty/cart',
    COUPON_LIST: '/coupon/list',
    APPLY_COUPON: '/apply-coupon',
    ADD_FAVOURITE: '/add/favourite',
    FAVOURITE_LIST: '/favourite/list',
    LANGUAGES: '/languages',
    USER_LANGUAGE: '/user/language/', //language id has to add in url
    TRANSACTION: '/transaction',
    TRANSACTION_CHECK: '/payment-response',
    WALLET_FULL_AMOUNT: '/wallet/order-fullamount',
    ORDER_DETAILS: '/order/detail/', //order id has to add in url
    ORDER_STATUS: '/order/status/', //order id has to add in url
    ORDERS: '/orders',
    REORDER: '/reorder/', //Order id has to add in url
    RATING: '/rating',
    WALLET: '/wallet',
    ADD_WALLET_MONEY: '/wallet/add-money',
    WALLET_TRANSACTION_CHECK: '/wallet/transaction-check',
    SEARCH: '/search',
    WALLET_USER_TRANSACTIONS: '/wallet-user-transactions',
    USER_LOGOUT: '/user/logout',
    QUICK_FILTER: '/homefilter/list',
    QUICK_FILTER_MENU_LIST: '/menufilter/list/', // menu iten id has to add in url
    ADDRESS_LIST: '/user/many/addresses',
    CHANGE_DEFAULT_ADDRESS: '/user/default/', //address id has to add in url
    USER_DETAIL: '/user/detail',
    USER_PRFILE_EDIT: '/user/edit',
    ADDRESS_DELETE: '/user/address/delete/', // address id has to add in url
    ADDRESS_EDIT: '/user/address/edit/', // address id has to add in url
    CURRENT_ORDERS: '/current/orders',
    HOME_BANNERS: '/home/banners',
    HOME_POPULAR_FOODS: '/home/popular-foods',
    HOME_COOK_NEAR_BY: '/home/cook-near',
    HOME_COOK_NEW: '/home/cook-new',
    HOME_COOK_TOP_RATED: '/home/cook-top-rated',
    HOME_COOK_OFFER: '/home/cook-offer',
    WALLET_STATUS: '/wallet/status',
    TRANSACTION_STATUS: '/transaction/status',
    TRANSACTION_CHECK: '/transaction/check',
    GET_FOOD_TYPES: '/foodtypes',
    OFFLINE_REFUND: '/order/paymentoffline/', //order id has to be passed in url
    WALLET_REFUND: '/order/walletrefund/', //order id has to be passed in url
}