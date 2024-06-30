import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BottomPanelProps {
    currentPage: 'map-page' | 'home-page' | string; 
}

const BottomPanel: React.FC<BottomPanelProps> = ({ currentPage }: BottomPanelProps) => {
    let homeButton: string, mapButton: string;
    const navigate = useNavigate();

    switch (currentPage) {
        case 'map-page':
            homeButton = '#4B4665';
            mapButton = '#B55700';
          break;
        case 'home-screen':
            homeButton = '#B55700';
            mapButton = '#4B4665';
          break;
        default:
            homeButton = '#4B4665';
            mapButton = '#4B4665';
          break;
      }
    return (
        <div className="bottom-panel">
            <button id='home-button' onClick={() => navigate('/home-screen')}>
                <svg width="48" height="50" viewBox="0 0 48 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.162 34.9532V44.2838H10.9438V40.0536H6.19147V44.2838H4.97326V34.9532H6.19147V39.0496H10.9438V34.9532H12.162ZM17.4416 44.4043C16.7544 44.4043 16.1296 44.2481 15.5674 43.9358C15.0141 43.6234 14.5768 43.1816 14.2555 42.6105C13.9431 42.0304 13.7869 41.361 13.7869 40.6024C13.7869 39.8528 13.9476 39.1923 14.2689 38.6212C14.5991 38.0411 15.0453 37.5993 15.6076 37.2959C16.1698 36.9835 16.799 36.8273 17.4951 36.8273C18.1912 36.8273 18.8204 36.9835 19.3827 37.2959C19.9449 37.5993 20.3867 38.0366 20.708 38.6078C21.0382 39.179 21.2033 39.8438 21.2033 40.6024C21.2033 41.361 21.0337 42.0304 20.6946 42.6105C20.3644 43.1816 19.9137 43.6234 19.3425 43.9358C18.7713 44.2481 18.1377 44.4043 17.4416 44.4043ZM17.4416 43.3333C17.8789 43.3333 18.2894 43.2307 18.6731 43.0254C19.0569 42.8202 19.3648 42.5123 19.5968 42.1018C19.8378 41.6912 19.9583 41.1914 19.9583 40.6024C19.9583 40.0134 19.8423 39.5136 19.6102 39.1031C19.3782 38.6926 19.0748 38.3891 18.6999 38.1928C18.3251 37.9875 17.919 37.8849 17.4817 37.8849C17.0355 37.8849 16.625 37.9875 16.2501 38.1928C15.8842 38.3891 15.5897 38.6926 15.3666 39.1031C15.1435 39.5136 15.0319 40.0134 15.0319 40.6024C15.0319 41.2004 15.139 41.7046 15.3532 42.1151C15.5763 42.5257 15.8708 42.8336 16.2367 43.0388C16.6026 43.2352 17.0043 43.3333 17.4416 43.3333ZM31.6269 36.8139C32.1981 36.8139 32.7068 36.9344 33.153 37.1754C33.5993 37.4074 33.9518 37.7599 34.2106 38.233C34.4694 38.706 34.5988 39.2816 34.5988 39.9599V44.2838H33.394V40.1339C33.394 39.4021 33.211 38.8443 32.8451 38.4605C32.4881 38.0678 32.0018 37.8715 31.386 37.8715C30.7523 37.8715 30.2481 38.0768 29.8732 38.4873C29.4984 38.8889 29.311 39.4735 29.311 40.241V44.2838H28.1062V40.1339C28.1062 39.4021 27.9232 38.8443 27.5573 38.4605C27.2003 38.0678 26.7139 37.8715 26.0981 37.8715C25.4645 37.8715 24.9603 38.0768 24.5854 38.4873C24.2106 38.8889 24.0232 39.4735 24.0232 40.241V44.2838H22.805V36.9478H24.0232V38.0054C24.2641 37.6216 24.5854 37.3271 24.987 37.1218C25.3976 36.9166 25.8483 36.8139 26.3391 36.8139C26.9549 36.8139 27.4993 36.9523 27.9723 37.2289C28.4453 37.5056 28.7978 37.9117 29.0299 38.4471C29.2351 37.9295 29.5743 37.5279 30.0473 37.2423C30.5203 36.9567 31.0468 36.8139 31.6269 36.8139ZM43.2905 40.3347C43.2905 40.5667 43.2772 40.8122 43.2504 41.071H37.3869C37.4316 41.7939 37.677 42.3606 38.1232 42.7711C38.5784 43.1727 39.1272 43.3735 39.7698 43.3735C40.2963 43.3735 40.7337 43.253 41.0817 43.0121C41.4387 42.7622 41.6886 42.432 41.8314 42.0214H43.1433C42.9469 42.7265 42.5543 43.3021 41.9652 43.7483C41.3762 44.1856 40.6444 44.4043 39.7698 44.4043C39.0737 44.4043 38.449 44.2481 37.8956 43.9358C37.3512 43.6234 36.9229 43.1816 36.6105 42.6105C36.2981 42.0304 36.142 41.361 36.142 40.6024C36.142 39.8438 36.2937 39.179 36.5971 38.6078C36.9005 38.0366 37.3245 37.5993 37.8689 37.2959C38.4222 36.9835 39.0558 36.8273 39.7698 36.8273C40.4659 36.8273 41.0817 36.979 41.6172 37.2825C42.1527 37.5859 42.5632 38.0054 42.8488 38.5408C43.1433 39.0674 43.2905 39.6653 43.2905 40.3347ZM42.0322 40.0803C42.0322 39.6163 41.9295 39.2191 41.7243 38.8889C41.519 38.5498 41.2379 38.2954 40.8809 38.1259C40.5328 37.9474 40.1446 37.8581 39.7162 37.8581C39.1005 37.8581 38.5739 38.0545 38.1366 38.4471C37.7082 38.8398 37.4628 39.3842 37.4003 40.0803H42.0322Z" 
                fill={homeButton}/>
                <path fillRule="evenodd" clipRule="evenodd" d="M14.1115 13.6458C13.9044 14.1457 13.865 14.4012 13.865 14.4626V24.9832C13.865 25.7078 14.4521 26.2956 15.1798 26.2956H19.1241V18.4069C19.1241 16.9546 20.3014 15.7774 21.7537 15.7774H27.0128C28.4651 15.7774 29.6423 16.9546 29.6423 18.4069V26.2956H33.5867C34.3144 26.2956 34.9015 25.7078 34.9015 24.9832V14.4626C34.9015 14.4012 34.862 14.1457 34.6549 13.6458C34.4626 13.1815 34.1708 12.6122 33.7901 11.9678C33.0297 10.681 31.9629 9.17716 30.7688 7.7443C29.572 6.30816 28.2801 4.98261 27.0788 4.0292C26.4783 3.55259 25.9262 3.18976 25.4423 2.95089C24.9473 2.70663 24.599 2.62956 24.3832 2.62956C24.1675 2.62956 23.8192 2.70663 23.3242 2.95089C22.8402 3.18976 22.2881 3.55259 21.6876 4.0292C20.4863 4.98261 19.1944 6.30816 17.9976 7.7443C16.8036 9.17716 15.7367 10.681 14.9764 11.9678C14.5956 12.6122 14.3039 13.1815 14.1115 13.6458ZM22.1605 0.592848C22.8519 0.251623 23.6129 0 24.3832 0C25.1536 0 25.9145 0.251623 26.606 0.592848C27.3083 0.939464 28.0198 1.41893 28.7135 1.96949C30.1007 3.07042 31.5205 4.53878 32.7889 6.0609C34.0601 7.5863 35.2119 9.20504 36.054 10.63C36.4743 11.3415 36.8299 12.0253 37.0843 12.6395C37.324 13.2182 37.531 13.8666 37.531 14.4626V24.9832C37.531 27.1632 35.7636 28.9252 33.5867 28.9252H29.6423C28.19 28.9252 27.0128 27.7479 27.0128 26.2956V18.4069H21.7537V26.2956C21.7537 27.7479 20.5764 28.9252 19.1241 28.9252H15.1798C13.0029 28.9252 11.2354 27.1632 11.2354 24.9832V14.4626C11.2354 13.8666 11.4425 13.2182 11.6822 12.6395C11.9366 12.0253 12.2921 11.3415 12.7125 10.63C13.5545 9.20504 14.7064 7.5863 15.9775 6.0609C17.246 4.53878 18.6658 3.07042 20.053 1.96949C20.7467 1.41893 21.4581 0.939464 22.1605 0.592848Z" 
                fill={homeButton}/>
                </svg>
            </button>
            <button id='map-button' onClick={() => navigate('/map-page')}>
                <svg width="49" height="51" viewBox="0 0 49 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3445 18.8491C12.8661 19.7941 11.3284 21.1108 11.3284 22.5673C11.3284 25.4428 17.3219 27.7737 24.7153 27.7737C32.1087 27.7737 38.1022 25.4428 38.1022 22.5673C38.1022 21.1108 36.5644 19.7941 34.0861 18.8491M24.7153 9.92457H24.7302M33.6399 9.92457C33.6399 15.969 26.9464 18.8491 24.7153 23.3114C22.4841 18.8491 15.7907 15.969 15.7907 9.92457C15.7907 4.99567 19.7864 1 24.7153 1C29.6442 1 33.6399 4.99567 33.6399 9.92457ZM26.2027 9.92457C26.2027 10.7461 25.5368 11.412 24.7153 11.412C23.8938 11.412 23.2279 10.7461 23.2279 9.92457C23.2279 9.1031 23.8938 8.43715 24.7153 8.43715C25.5368 8.43715 26.2027 9.1031 26.2027 9.92457Z" 
                stroke={mapButton} 
                strokeWidth="1.91241" strokeLinecap="round" strokeLinejoin="round"/> 
                <path d="M20.3988 36.3786V45.6423H19.1806V38.7347L16.1016 45.6423H15.2448L12.1525 38.7213V45.6423H10.9342V36.3786H12.2462L15.6732 44.0359L19.1002 36.3786H20.3988ZM22.0096 41.9476C22.0096 41.1979 22.1613 40.5419 22.4647 39.9797C22.7682 39.4085 23.1832 38.9668 23.7097 38.6544C24.2452 38.342 24.8387 38.1859 25.4902 38.1859C26.1327 38.1859 26.6905 38.3242 27.1635 38.6008C27.6365 38.8775 27.989 39.2256 28.2211 39.645V38.3063H29.4527V45.6423H28.2211V44.2769C27.9801 44.7053 27.6187 45.0622 27.1367 45.3478C26.6637 45.6245 26.1104 45.7628 25.4768 45.7628C24.8253 45.7628 24.2363 45.6022 23.7097 45.2809C23.1832 44.9596 22.7682 44.5089 22.4647 43.9288C22.1613 43.3487 22.0096 42.6883 22.0096 41.9476ZM28.2211 41.9609C28.2211 41.4076 28.1095 40.9257 27.8864 40.5152C27.6633 40.1046 27.3599 39.7923 26.9761 39.5781C26.6013 39.355 26.1863 39.2434 25.7311 39.2434C25.276 39.2434 24.861 39.3505 24.4861 39.5647C24.1113 39.7789 23.8123 40.0912 23.5892 40.5018C23.3661 40.9123 23.2546 41.3942 23.2546 41.9476C23.2546 42.5098 23.3661 43.0007 23.5892 43.4201C23.8123 43.8306 24.1113 44.1475 24.4861 44.3706C24.861 44.5848 25.276 44.6919 25.7311 44.6919C26.1863 44.6919 26.6013 44.5848 26.9761 44.3706C27.3599 44.1475 27.6633 43.8306 27.8864 43.4201C28.1095 43.0007 28.2211 42.5143 28.2211 41.9609ZM32.7295 39.6584C32.9705 39.239 33.3275 38.8909 33.8005 38.6142C34.2824 38.3286 34.8402 38.1859 35.4738 38.1859C36.1253 38.1859 36.7143 38.342 37.2409 38.6544C37.7764 38.9668 38.1958 39.4085 38.4993 39.9797C38.8027 40.5419 38.9544 41.1979 38.9544 41.9476C38.9544 42.6883 38.8027 43.3487 38.4993 43.9288C38.1958 44.5089 37.7764 44.9596 37.2409 45.2809C36.7143 45.6022 36.1253 45.7628 35.4738 45.7628C34.8491 45.7628 34.2958 45.6245 33.8139 45.3478C33.3409 45.0622 32.9794 44.7097 32.7295 44.2903V49.1229H31.5113V38.3063H32.7295V39.6584ZM37.7094 41.9476C37.7094 41.3942 37.5979 40.9123 37.3748 40.5018C37.1516 40.0912 36.8482 39.7789 36.4645 39.5647C36.0896 39.3505 35.6746 39.2434 35.2195 39.2434C34.7733 39.2434 34.3583 39.355 33.9745 39.5781C33.5997 39.7923 33.2962 40.1091 33.0642 40.5286C32.8411 40.9391 32.7295 41.4165 32.7295 41.9609C32.7295 42.5143 32.8411 43.0007 33.0642 43.4201C33.2962 43.8306 33.5997 44.1475 33.9745 44.3706C34.3583 44.5848 34.7733 44.6919 35.2195 44.6919C35.6746 44.6919 36.0896 44.5848 36.4645 44.3706C36.8482 44.1475 37.1516 43.8306 37.3748 43.4201C37.5979 43.0007 37.7094 42.5098 37.7094 41.9476Z" 
                fill={mapButton}/>
                </svg>
            </button>
        </div>
    );
};

export default BottomPanel;

 
