import React from 'react';
import { useNavigate } from 'react-router-dom';


const BottomPanel = () => {

  const navigate = useNavigate();

  return (
    <div className="bottom-panel">
        <button id='lost-page' onClick={() => navigate('/lost-page')} >
            <svg width="48" height="50" viewBox="0 0 48 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.162 34.9532V44.2838H10.9438V40.0536H6.19147V44.2838H4.97326V34.9532H6.19147V39.0496H10.9438V34.9532H12.162ZM17.4416 44.4043C16.7544 44.4043 16.1296 44.2481 15.5674 43.9358C15.0141 43.6234 14.5768 43.1816 14.2555 42.6105C13.9431 42.0304 13.7869 41.361 13.7869 40.6024C13.7869 39.8528 13.9476 39.1923 14.2689 38.6212C14.5991 38.0411 15.0453 37.5993 15.6076 37.2959C16.1698 36.9835 16.799 36.8273 17.4951 36.8273C18.1912 36.8273 18.8204 36.9835 19.3827 37.2959C19.9449 37.5993 20.3867 38.0366 20.708 38.6078C21.0382 39.179 21.2033 39.8438 21.2033 40.6024C21.2033 41.361 21.0337 42.0304 20.6946 42.6105C20.3644 43.1816 19.9137 43.6234 19.3425 43.9358C18.7713 44.2481 18.1377 44.4043 17.4416 44.4043ZM17.4416 43.3333C17.8789 43.3333 18.2894 43.2307 18.6731 43.0254C19.0569 42.8202 19.3648 42.5123 19.5968 42.1018C19.8378 41.6912 19.9583 41.1914 19.9583 40.6024C19.9583 40.0134 19.8423 39.5136 19.6102 39.1031C19.3782 38.6926 19.0748 38.3891 18.6999 38.1928C18.3251 37.9875 17.919 37.8849 17.4817 37.8849C17.0355 37.8849 16.625 37.9875 16.2501 38.1928C15.8842 38.3891 15.5897 38.6926 15.3666 39.1031C15.1435 39.5136 15.0319 40.0134 15.0319 40.6024C15.0319 41.2004 15.139 41.7046 15.3532 42.1151C15.5763 42.5257 15.8708 42.8336 16.2367 43.0388C16.6026 43.2352 17.0043 43.3333 17.4416 43.3333ZM31.6269 36.8139C32.1981 36.8139 32.7068 36.9344 33.153 37.1754C33.5993 37.4074 33.9518 37.7599 34.2106 38.233C34.4694 38.706 34.5988 39.2816 34.5988 39.9599V44.2838H33.394V40.1339C33.394 39.4021 33.211 38.8443 32.8451 38.4605C32.4881 38.0678 32.0018 37.8715 31.386 37.8715C30.7523 37.8715 30.2481 38.0768 29.8732 38.4873C29.4984 38.8889 29.311 39.4735 29.311 40.241V44.2838H28.1062V40.1339C28.1062 39.4021 27.9232 38.8443 27.5573 38.4605C27.2003 38.0678 26.7139 37.8715 26.0981 37.8715C25.4645 37.8715 24.9603 38.0768 24.5854 38.4873C24.2106 38.8889 24.0232 39.4735 24.0232 40.241V44.2838H22.805V36.9478H24.0232V38.0054C24.2641 37.6216 24.5854 37.3271 24.987 37.1218C25.3976 36.9166 25.8483 36.8139 26.3391 36.8139C26.9549 36.8139 27.4993 36.9523 27.9723 37.2289C28.4453 37.5056 28.7978 37.9117 29.0299 38.4471C29.2351 37.9295 29.5743 37.5279 30.0473 37.2423C30.5203 36.9567 31.0468 36.8139 31.6269 36.8139ZM43.2905 40.3347C43.2905 40.5667 43.2772 40.8122 43.2504 41.071H37.3869C37.4316 41.7939 37.677 42.3606 38.1232 42.7711C38.5784 43.1727 39.1272 43.3735 39.7698 43.3735C40.2963 43.3735 40.7337 43.253 41.0817 43.0121C41.4387 42.7622 41.6886 42.432 41.8314 42.0214H43.1433C42.9469 42.7265 42.5543 43.3021 41.9652 43.7483C41.3762 44.1856 40.6444 44.4043 39.7698 44.4043C39.0737 44.4043 38.449 44.2481 37.8956 43.9358C37.3512 43.6234 36.9229 43.1816 36.6105 42.6105C36.2981 42.0304 36.142 41.361 36.142 40.6024C36.142 39.8438 36.2937 39.179 36.5971 38.6078C36.9005 38.0366 37.3245 37.5993 37.8689 37.2959C38.4222 36.9835 39.0558 36.8273 39.7698 36.8273C40.4659 36.8273 41.0817 36.979 41.6172 37.2825C42.1527 37.5859 42.5632 38.0054 42.8488 38.5408C43.1433 39.0674 43.2905 39.6653 43.2905 40.3347ZM42.0322 40.0803C42.0322 39.6163 41.9295 39.2191 41.7243 38.8889C41.519 38.5498 41.2379 38.2954 40.8809 38.1259C40.5328 37.9474 40.1446 37.8581 39.7162 37.8581C39.1005 37.8581 38.5739 38.0545 38.1366 38.4471C37.7082 38.8398 37.4628 39.3842 37.4003 40.0803H42.0322Z" fill="#4B4665"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M14.1115 13.6458C13.9044 14.1457 13.865 14.4012 13.865 14.4626V24.9832C13.865 25.7078 14.4521 26.2956 15.1798 26.2956H19.1241V18.4069C19.1241 16.9546 20.3014 15.7774 21.7537 15.7774H27.0128C28.4651 15.7774 29.6423 16.9546 29.6423 18.4069V26.2956H33.5867C34.3144 26.2956 34.9015 25.7078 34.9015 24.9832V14.4626C34.9015 14.4012 34.862 14.1457 34.6549 13.6458C34.4626 13.1815 34.1708 12.6122 33.7901 11.9678C33.0297 10.681 31.9629 9.17716 30.7688 7.7443C29.572 6.30816 28.2801 4.98261 27.0788 4.0292C26.4783 3.55259 25.9262 3.18976 25.4423 2.95089C24.9473 2.70663 24.599 2.62956 24.3832 2.62956C24.1675 2.62956 23.8192 2.70663 23.3242 2.95089C22.8402 3.18976 22.2881 3.55259 21.6876 4.0292C20.4863 4.98261 19.1944 6.30816 17.9976 7.7443C16.8036 9.17716 15.7367 10.681 14.9764 11.9678C14.5956 12.6122 14.3039 13.1815 14.1115 13.6458ZM22.1605 0.592848C22.8519 0.251623 23.6129 0 24.3832 0C25.1536 0 25.9145 0.251623 26.606 0.592848C27.3083 0.939464 28.0198 1.41893 28.7135 1.96949C30.1007 3.07042 31.5205 4.53878 32.7889 6.0609C34.0601 7.5863 35.2119 9.20504 36.054 10.63C36.4743 11.3415 36.8299 12.0253 37.0843 12.6395C37.324 13.2182 37.531 13.8666 37.531 14.4626V24.9832C37.531 27.1632 35.7636 28.9252 33.5867 28.9252H29.6423C28.19 28.9252 27.0128 27.7479 27.0128 26.2956V18.4069H21.7537V26.2956C21.7537 27.7479 20.5764 28.9252 19.1241 28.9252H15.1798C13.0029 28.9252 11.2354 27.1632 11.2354 24.9832V14.4626C11.2354 13.8666 11.4425 13.2182 11.6822 12.6395C11.9366 12.0253 12.2921 11.3415 12.7125 10.63C13.5545 9.20504 14.7064 7.5863 15.9775 6.0609C17.246 4.53878 18.6658 3.07042 20.053 1.96949C20.7467 1.41893 21.4581 0.939464 22.1605 0.592848Z" fill="#4B4665"/>
            </svg>
        </button>
        <button>
            <svg width="49" height="51" viewBox="0 0 49 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.3445 18.8491C12.8661 19.7941 11.3284 21.1108 11.3284 22.5673C11.3284 25.4428 17.3219 27.7737 24.7153 27.7737C32.1087 27.7737 38.1022 25.4428 38.1022 22.5673C38.1022 21.1108 36.5644 19.7941 34.0861 18.8491M24.7153 9.92457H24.7302M33.6399 9.92457C33.6399 15.969 26.9464 18.8491 24.7153 23.3114C22.4841 18.8491 15.7907 15.969 15.7907 9.92457C15.7907 4.99567 19.7864 1 24.7153 1C29.6442 1 33.6399 4.99567 33.6399 9.92457ZM26.2027 9.92457C26.2027 10.7461 25.5368 11.412 24.7153 11.412C23.8938 11.412 23.2279 10.7461 23.2279 9.92457C23.2279 9.1031 23.8938 8.43715 24.7153 8.43715C25.5368 8.43715 26.2027 9.1031 26.2027 9.92457Z" stroke="#B55700" strokeWidth="1.91241" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.3988 36.3786V45.6423H19.1806V38.7347L16.1016 45.6423H15.2448L12.1525 38.7213V45.6423H10.9342V36.3786H12.2462L15.6732 44.0359L19.1002 36.3786H20.3988ZM22.0096 41.9476C22.0096 41.1979 22.1613 40.5419 22.4647 39.9797C22.7682 39.4085 23.1832 38.9668 23.7097 38.6544C24.2452 38.342 24.8387 38.1859 25.4902 38.1859C26.1327 38.1859 26.6905 38.3242 27.1635 38.6008C27.6365 38.8775 27.989 39.2256 28.2211 39.645V38.3063H29.4527V45.6423H28.2211V44.2769C27.9801 44.7053 27.6187 45.0622 27.1367 45.3478C26.6637 45.6245 26.1104 45.7628 25.4768 45.7628C24.8253 45.7628 24.2363 45.6022 23.7097 45.2809C23.1832 44.9596 22.7682 44.5089 22.4647 43.9288C22.1613 43.3487 22.0096 42.6883 22.0096 41.9476ZM28.2211 41.9609C28.2211 41.4076 28.1095 40.9257 27.8864 40.5152C27.6633 40.1046 27.3599 39.7923 26.9761 39.5781C26.6013 39.355 26.1863 39.2434 25.7311 39.2434C25.276 39.2434 24.861 39.3505 24.4861 39.5647C24.1113 39.7789 23.8123 40.0912 23.5892 40.5018C23.3661 40.9123 23.2546 41.3942 23.2546 41.9476C23.2546 42.5098 23.3661 43.0007 23.5892 43.4201C23.8123 43.8306 24.1113 44.1475 24.4861 44.3706C24.861 44.5848 25.276 44.6919 25.7311 44.6919C26.1863 44.6919 26.6013 44.5848 26.9761 44.3706C27.3599 44.1475 27.6633 43.8306 27.8864 43.4201C28.1095 43.0007 28.2211 42.5143 28.2211 41.9609ZM32.7295 39.6584C32.9705 39.239 33.3275 38.8909 33.8005 38.6142C34.2824 38.3286 34.8402 38.1859 35.4738 38.1859C36.1253 38.1859 36.7143 38.342 37.2409 38.6544C37.7764 38.9668 38.1958 39.4085 38.4993 39.9797C38.8027 40.5419 38.9544 41.1979 38.9544 41.9476C38.9544 42.6883 38.8027 43.3487 38.4993 43.9288C38.1958 44.5089 37.7764 44.9596 37.2409 45.2809C36.7143 45.6022 36.1253 45.7628 35.4738 45.7628C34.8491 45.7628 34.2958 45.6245 33.8139 45.3478C33.3409 45.0622 32.9794 44.7097 32.7295 44.2903V49.1229H31.5113V38.3063H32.7295V39.6584ZM37.7094 41.9476C37.7094 41.3942 37.5979 40.9123 37.3748 40.5018C37.1516 40.0912 36.8482 39.7789 36.4645 39.5647C36.0896 39.3505 35.6746 39.2434 35.2195 39.2434C34.7733 39.2434 34.3583 39.355 33.9745 39.5781C33.5997 39.7923 33.2962 40.1091 33.0642 40.5286C32.8411 40.9391 32.7295 41.4165 32.7295 41.9609C32.7295 42.5143 32.8411 43.0007 33.0642 43.4201C33.2962 43.8306 33.5997 44.1475 33.9745 44.3706C34.3583 44.5848 34.7733 44.6919 35.2195 44.6919C35.6746 44.6919 36.0896 44.5848 36.4645 44.3706C36.8482 44.1475 37.1516 43.8306 37.3748 43.4201C37.5979 43.0007 37.7094 42.5098 37.7094 41.9476Z" fill="#B55700"/>
            </svg>
        </button>
        <button id='found-page' onClick={() => navigate('/found-page')} >
            <svg width="70" height="49" viewBox="0 0 70 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M47.2353 12.833C47.2353 19.3683 41.9375 24.6661 35.4023 24.6661C32.7249 24.6661 23.5702 24.6661 23.5702 24.6661C23.5702 24.6661 25.6202 19.7436 24.7998 18.0932C24.0122 16.5086 23.5693 14.7226 23.5693 12.833C23.5693 6.29783 28.8671 1 35.4023 1C41.9375 1 47.2353 6.29783 47.2353 12.833Z" stroke="#4B4665" strokeWidth="1.91241" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.9346 34.4663V43.73H10.7164V36.8224L7.63742 43.73H6.78066L3.68829 36.809V43.73H2.47009V34.4663H3.782L7.20904 42.1236L10.6361 34.4663H11.9346ZM20.694 39.7809C20.694 40.0129 20.6806 40.2583 20.6538 40.5171H14.7904C14.835 41.24 15.0804 41.8067 15.5267 42.2173C15.9818 42.6189 16.5307 42.8197 17.1733 42.8197C17.6998 42.8197 18.1371 42.6992 18.4852 42.4582C18.8421 42.2083 19.092 41.8781 19.2348 41.4676H20.5467C20.3504 42.1726 19.9577 42.7483 19.3687 43.1945C18.7797 43.6318 18.0479 43.8505 17.1733 43.8505C16.4771 43.8505 15.8524 43.6943 15.2991 43.3819C14.7547 43.0696 14.3263 42.6278 14.014 42.0566C13.7016 41.4765 13.5454 40.8072 13.5454 40.0486C13.5454 39.29 13.6971 38.6251 14.0006 38.054C14.304 37.4828 14.7279 37.0455 15.2723 36.742C15.8256 36.4297 16.4593 36.2735 17.1733 36.2735C17.8694 36.2735 18.4852 36.4252 19.0206 36.7287C19.5561 37.0321 19.9666 37.4515 20.2522 37.987C20.5467 38.5136 20.694 39.1115 20.694 39.7809ZM19.4356 39.5265C19.4356 39.0624 19.333 38.6653 19.1277 38.3351C18.9225 37.9959 18.6413 37.7416 18.2844 37.572C17.9363 37.3935 17.5481 37.3043 17.1197 37.3043C16.5039 37.3043 15.9774 37.5006 15.5401 37.8933C15.1117 38.286 14.8663 38.8304 14.8038 39.5265H19.4356ZM24.899 43.8505C24.3368 43.8505 23.8326 43.7568 23.3863 43.5693C22.9401 43.373 22.5876 43.1053 22.3288 42.7661C22.07 42.4181 21.9272 42.0209 21.9004 41.5747H23.1587C23.1944 41.9406 23.364 42.2396 23.6675 42.4716C23.9798 42.7037 24.3859 42.8197 24.8857 42.8197C25.3497 42.8197 25.7156 42.717 25.9834 42.5118C26.2511 42.3065 26.385 42.0477 26.385 41.7353C26.385 41.4141 26.2422 41.1776 25.9566 41.0258C25.671 40.8652 25.2293 40.709 24.6313 40.5573C24.0869 40.4145 23.6407 40.2717 23.2926 40.1289C22.9535 39.9772 22.659 39.7585 22.4091 39.473C22.1681 39.1784 22.0476 38.7947 22.0476 38.3217C22.0476 37.9469 22.1592 37.6033 22.3823 37.2909C22.6054 36.9785 22.9222 36.7331 23.3328 36.5546C23.7433 36.3672 24.2118 36.2735 24.7384 36.2735C25.5505 36.2735 26.2065 36.4788 26.7063 36.8893C27.206 37.2998 27.4738 37.8621 27.5095 38.576H26.2913C26.2645 38.1923 26.1083 37.8844 25.8227 37.6523C25.5461 37.4203 25.1712 37.3043 24.6982 37.3043C24.2609 37.3043 23.9129 37.398 23.6541 37.5854C23.3953 37.7728 23.2658 38.0183 23.2658 38.3217C23.2658 38.5627 23.3417 38.7635 23.4934 38.9241C23.6541 39.0758 23.8504 39.2008 24.0824 39.2989C24.3234 39.3882 24.6536 39.4908 25.0731 39.6068C25.5996 39.7496 26.028 39.8924 26.3582 40.0352C26.6884 40.1691 26.9695 40.3743 27.2016 40.651C27.4425 40.9277 27.5675 41.2891 27.5764 41.7353C27.5764 42.1369 27.4649 42.4984 27.2417 42.8197C27.0186 43.141 26.7018 43.3953 26.2913 43.5827C25.8897 43.7612 25.4256 43.8505 24.899 43.8505ZM31.8932 43.8505C31.3309 43.8505 30.8267 43.7568 30.3804 43.5693C29.9342 43.373 29.5817 43.1053 29.3229 42.7661C29.0641 42.4181 28.9213 42.0209 28.8945 41.5747H30.1529C30.1886 41.9406 30.3581 42.2396 30.6616 42.4716C30.9739 42.7037 31.38 42.8197 31.8798 42.8197C32.3438 42.8197 32.7098 42.717 32.9775 42.5118C33.2452 42.3065 33.3791 42.0477 33.3791 41.7353C33.3791 41.4141 33.2363 41.1776 32.9507 41.0258C32.6651 40.8652 32.2234 40.709 31.6254 40.5573C31.081 40.4145 30.6348 40.2717 30.2867 40.1289C29.9476 39.9772 29.6531 39.7585 29.4032 39.473C29.1622 39.1784 29.0418 38.7947 29.0418 38.3217C29.0418 37.9469 29.1533 37.6033 29.3764 37.2909C29.5995 36.9785 29.9164 36.7331 30.3269 36.5546C30.7374 36.3672 31.206 36.2735 31.7325 36.2735C32.5446 36.2735 33.2006 36.4788 33.7004 36.8893C34.2002 37.2998 34.4679 37.8621 34.5036 38.576H33.2854C33.2586 38.1923 33.1024 37.8844 32.8168 37.6523C32.5402 37.4203 32.1654 37.3043 31.6924 37.3043C31.255 37.3043 30.907 37.398 30.6482 37.5854C30.3894 37.7728 30.26 38.0183 30.26 38.3217C30.26 38.5627 30.3358 38.7635 30.4875 38.9241C30.6482 39.0758 30.8445 39.2008 31.0766 39.2989C31.3175 39.3882 31.6477 39.4908 32.0672 39.6068C32.5937 39.7496 33.0221 39.8924 33.3523 40.0352C33.6825 40.1691 33.9637 40.3743 34.1957 40.651C34.4367 40.9277 34.5616 41.2891 34.5705 41.7353C34.5705 42.1369 34.459 42.4984 34.2359 42.8197C34.0127 43.141 33.6959 43.3953 33.2854 43.5827C32.8838 43.7612 32.4197 43.8505 31.8932 43.8505ZM35.8351 40.0352C35.8351 39.2855 35.9868 38.6296 36.2902 38.0673C36.5937 37.4962 37.0086 37.0544 37.5352 36.742C38.0707 36.4297 38.6642 36.2735 39.3156 36.2735C39.9582 36.2735 40.516 36.4118 40.989 36.6885C41.462 36.9652 41.8145 37.3132 42.0466 37.7327V36.394H43.2782V43.73H42.0466V42.3645C41.8056 42.7929 41.4442 43.1499 40.9622 43.4355C40.4892 43.7121 39.9359 43.8505 39.3023 43.8505C38.6508 43.8505 38.0617 43.6898 37.5352 43.3685C37.0086 43.0473 36.5937 42.5966 36.2902 42.0165C35.9868 41.4364 35.8351 40.7759 35.8351 40.0352ZM42.0466 40.0486C42.0466 39.4953 41.935 39.0133 41.7119 38.6028C41.4888 38.1923 41.1853 37.8799 40.8016 37.6657C40.4268 37.4426 40.0118 37.3311 39.5566 37.3311C39.1015 37.3311 38.6865 37.4382 38.3116 37.6523C37.9368 37.8665 37.6378 38.1789 37.4147 38.5894C37.1916 39 37.08 39.4819 37.08 40.0352C37.08 40.5975 37.1916 41.0883 37.4147 41.5078C37.6378 41.9183 37.9368 42.2351 38.3116 42.4582C38.6865 42.6724 39.1015 42.7795 39.5566 42.7795C40.0118 42.7795 40.4268 42.6724 40.8016 42.4582C41.1853 42.2351 41.4888 41.9183 41.7119 41.5078C41.935 41.0883 42.0466 40.6019 42.0466 40.0486ZM48.3622 36.2735C48.9959 36.2735 49.5492 36.4118 50.0222 36.6885C50.5041 36.9652 50.8611 37.3132 51.0932 37.7327V36.394H52.3247V43.8906C52.3247 44.56 52.182 45.1535 51.8964 45.6711C51.6108 46.1976 51.2002 46.6082 50.6648 46.9027C50.1382 47.1972 49.5224 47.3444 48.8174 47.3444C47.8535 47.3444 47.0503 47.1169 46.4078 46.6617C45.7652 46.2065 45.3859 45.5863 45.2699 44.8009H46.4747C46.6086 45.2472 46.8852 45.6041 47.3047 45.8719C47.7241 46.1485 48.2284 46.2869 48.8174 46.2869C49.4867 46.2869 50.0311 46.0771 50.4506 45.6577C50.879 45.2382 51.0932 44.6492 51.0932 43.8906V42.3511C50.8522 42.7795 50.4952 43.1365 50.0222 43.4221C49.5492 43.7077 48.9959 43.8505 48.3622 43.8505C47.7107 43.8505 47.1173 43.6898 46.5818 43.3685C46.0552 43.0473 45.6402 42.5966 45.3368 42.0165C45.0334 41.4364 44.8817 40.7759 44.8817 40.0352C44.8817 39.2855 45.0334 38.6296 45.3368 38.0673C45.6402 37.4962 46.0552 37.0544 46.5818 36.742C47.1173 36.4297 47.7107 36.2735 48.3622 36.2735ZM51.0932 40.0486C51.0932 39.4953 50.9816 39.0133 50.7585 38.6028C50.5354 38.1923 50.2319 37.8799 49.8482 37.6657C49.4733 37.4426 49.0584 37.3311 48.6032 37.3311C48.148 37.3311 47.7331 37.4382 47.3582 37.6523C46.9834 37.8665 46.6844 38.1789 46.4613 38.5894C46.2382 39 46.1266 39.4819 46.1266 40.0352C46.1266 40.5975 46.2382 41.0883 46.4613 41.5078C46.6844 41.9183 46.9834 42.2351 47.3582 42.4582C47.7331 42.6724 48.148 42.7795 48.6032 42.7795C49.0584 42.7795 49.4733 42.6724 49.8482 42.4582C50.2319 42.2351 50.5354 41.9183 50.7585 41.5078C50.9816 41.0883 51.0932 40.6019 51.0932 40.0486ZM61.0768 39.7809C61.0768 40.0129 61.0634 40.2583 61.0367 40.5171H55.1732C55.2178 41.24 55.4633 41.8067 55.9095 42.2173C56.3647 42.6189 56.9135 42.8197 57.5561 42.8197C58.0826 42.8197 58.5199 42.6992 58.868 42.4582C59.225 42.2083 59.4749 41.8781 59.6177 41.4676H60.9296C60.7332 42.1726 60.3405 42.7483 59.7515 43.1945C59.1625 43.6318 58.4307 43.8505 57.5561 43.8505C56.86 43.8505 56.2352 43.6943 55.6819 43.3819C55.1375 43.0696 54.7091 42.6278 54.3968 42.0566C54.0844 41.4765 53.9282 40.8072 53.9282 40.0486C53.9282 39.29 54.08 38.6251 54.3834 38.054C54.6868 37.4828 55.1107 37.0455 55.6551 36.742C56.2085 36.4297 56.8421 36.2735 57.5561 36.2735C58.2522 36.2735 58.868 36.4252 59.4035 36.7287C59.9389 37.0321 60.3495 37.4515 60.6351 37.987C60.9296 38.5136 61.0768 39.1115 61.0768 39.7809ZM59.8185 39.5265C59.8185 39.0624 59.7158 38.6653 59.5106 38.3351C59.3053 37.9959 59.0242 37.7416 58.6672 37.572C58.3191 37.3935 57.9309 37.3043 57.5025 37.3043C56.8867 37.3043 56.3602 37.5006 55.9229 37.8933C55.4945 38.286 55.2491 38.8304 55.1866 39.5265H59.8185ZM65.2819 43.8505C64.7196 43.8505 64.2154 43.7568 63.7692 43.5693C63.3229 43.373 62.9704 43.1053 62.7116 42.7661C62.4528 42.4181 62.31 42.0209 62.2832 41.5747H63.5416C63.5773 41.9406 63.7468 42.2396 64.0503 42.4716C64.3626 42.7037 64.7687 42.8197 65.2685 42.8197C65.7326 42.8197 66.0985 42.717 66.3662 42.5118C66.6339 42.3065 66.7678 42.0477 66.7678 41.7353C66.7678 41.4141 66.625 41.1776 66.3394 41.0258C66.0538 40.8652 65.6121 40.709 65.0141 40.5573C64.4697 40.4145 64.0235 40.2717 63.6754 40.1289C63.3363 39.9772 63.0418 39.7585 62.7919 39.473C62.5509 39.1784 62.4305 38.7947 62.4305 38.3217C62.4305 37.9469 62.542 37.6033 62.7651 37.2909C62.9883 36.9785 63.3051 36.7331 63.7156 36.5546C64.1261 36.3672 64.5947 36.2735 65.1212 36.2735C65.9334 36.2735 66.5893 36.4788 67.0891 36.8893C67.5889 37.2998 67.8566 37.8621 67.8923 38.576H66.6741C66.6473 38.1923 66.4911 37.8844 66.2056 37.6523C65.9289 37.4203 65.5541 37.3043 65.0811 37.3043C64.6438 37.3043 64.2957 37.398 64.0369 37.5854C63.7781 37.7728 63.6487 38.0183 63.6487 38.3217C63.6487 38.5627 63.7245 38.7635 63.8762 38.9241C64.0369 39.0758 64.2332 39.2008 64.4653 39.2989C64.7062 39.3882 65.0364 39.4908 65.4559 39.6068C65.9824 39.7496 66.4108 39.8924 66.741 40.0352C67.0712 40.1691 67.3524 40.3743 67.5844 40.651C67.8254 40.9277 67.9503 41.2891 67.9592 41.7353C67.9592 42.1369 67.8477 42.4984 67.6246 42.8197C67.4015 43.141 67.0846 43.3953 66.6741 43.5827C66.2725 43.7612 65.8084 43.8505 65.2819 43.8505Z" fill="#4B4665"/>
            </svg>
        </button>
    </div>
  );
};

export default BottomPanel;
