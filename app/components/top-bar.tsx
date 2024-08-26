import React from 'react';
import FilterButton from './filter-button'; // Ensure the import path is correct


interface TopBarProps {
    title: string;
    filters?: any; // Replace 'any' with the appropriate type for filters
    setFilters?: (filters: any) => void; // Replace 'any' with the appropriate type
  }

export default function TopBar({ title, filters, setFilters }: TopBarProps) {
  return (
    <div id="top-bar">
      <div id="logo" className="padding-left padding-top">

        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="30" fill="#EEE5DF"/>
    <g clip-path="url(#clip0_54_300)">
    <g clip-path="url(#clip1_54_300)">
    <path d="M33.4787 38.69C32.9726 38.69 32.4195 38.6504 31.8349 38.6092C30.4879 38.5162 28.9751 38.5162 27.628 38.6092C27.0426 38.6504 26.492 38.69 25.9858 38.69C25.2824 38.69 24.3905 38.6254 23.7542 38.1168C23.1526 37.6365 22.8607 36.8409 22.8607 35.6846C22.8607 32.059 25.8015 28.0033 29.7335 28.0033C33.6671 28.0033 36.6063 32.059 36.6063 35.6846C36.6038 38.3335 35.0239 38.69 33.4787 38.69ZM29.7311 37.706C30.4919 37.706 31.2342 37.757 31.8915 37.8039C32.4616 37.8435 33.0009 37.8815 33.4787 37.8815C35.015 37.8815 35.7953 37.5419 35.7953 35.6846C35.7953 32.4391 33.2022 28.8119 29.7311 28.8119C26.2599 28.8119 23.6669 32.4399 23.6669 35.6846C23.6669 36.5773 23.8593 37.1675 24.2571 37.4853C24.5999 37.7602 25.1336 37.8815 25.9834 37.8815C26.4612 37.8815 27.0006 37.8435 27.5706 37.8039C28.2279 37.7586 28.9702 37.706 29.7311 37.706Z" fill="#915C28"/>
    <path d="M23.3782 30.3861C22.4217 30.3861 21.4263 29.7223 20.9016 28.7286C20.5175 28.0049 20.4342 27.215 20.6711 26.5608C20.8531 26.0644 21.2072 25.6852 21.6746 25.4935C22.7427 25.0537 24.2094 25.7571 24.874 27.0128C25.2573 27.7373 25.3406 28.5264 25.1037 29.1806C24.9234 29.677 24.5692 30.0571 24.1027 30.2479C23.8724 30.3403 23.6264 30.3873 23.3782 30.3861ZM22.3974 26.163C22.2486 26.163 22.1104 26.1889 21.981 26.2423C21.6568 26.3765 21.5023 26.6385 21.4304 26.8357C21.2735 27.2708 21.343 27.8367 21.6155 28.3502C22.0861 29.2396 23.1065 29.7838 23.7946 29.4991C24.118 29.3665 24.2725 29.103 24.3436 28.9065C24.5005 28.4739 24.4309 27.9079 24.1585 27.392C23.776 26.6676 23.0507 26.163 22.3974 26.163Z" fill="#915C28"/>
    <path d="M27.89 27.8748C26.7637 27.8748 25.7643 26.6717 25.5136 25.0133C25.2347 23.1981 25.9616 21.585 27.1655 21.34C28.3662 21.0983 29.5742 22.3612 29.8507 24.17C30.1289 25.9836 29.4004 27.5975 28.1972 27.8441C28.0954 27.8643 27.9927 27.8748 27.89 27.8748ZM27.4728 22.117C27.4234 22.117 27.3741 22.1219 27.324 22.1332C26.5688 22.2852 26.1055 23.5498 26.3109 24.892C26.5332 26.3612 27.3749 27.194 28.0347 27.0509C28.7907 26.8989 29.2556 25.6327 29.0511 24.2921C28.8433 22.9305 28.0856 22.117 27.4728 22.117Z" fill="#915C28"/>
    <path d="M36.0855 30.3861C35.8369 30.3872 35.5905 30.3394 35.3603 30.2455C34.8953 30.0546 34.538 29.6762 34.3585 29.1822C34.1216 28.5265 34.2065 27.7381 34.5881 27.0128C35.2543 25.7571 36.7162 25.0529 37.7892 25.4935C38.2557 25.6844 38.6131 26.0636 38.7918 26.56C39.0279 27.2166 38.9438 28.0049 38.5606 28.7302C38.0358 29.7207 37.0413 30.3861 36.0855 30.3861ZM37.0647 26.163C36.4082 26.163 35.6861 26.6676 35.3021 27.3929C35.0304 27.9071 34.9592 28.4731 35.1169 28.9065C35.1889 29.103 35.3401 29.3649 35.6659 29.4975C35.7994 29.5518 35.9422 29.5795 36.0864 29.5792C36.7405 29.5792 37.4633 29.0747 37.8466 28.3494C38.1199 27.8351 38.1886 27.2691 38.0318 26.8349C37.9582 26.6377 37.8062 26.3757 37.4803 26.2431C37.3485 26.189 37.2072 26.1618 37.0647 26.163Z" fill="#915C28"/>
    <path d="M32.3807 27.8747C32.2773 27.8744 32.1741 27.8641 32.0727 27.844C30.8695 27.5974 30.141 25.9835 30.4192 24.1699C30.6957 22.3603 31.9053 21.0966 33.1044 21.3399C34.3075 21.5857 35.0352 23.1988 34.7579 25.0132C34.5064 26.6708 33.5063 27.8747 32.3807 27.8747ZM32.798 22.117C32.1851 22.117 31.4274 22.9304 31.2196 24.2904C31.0151 25.6318 31.48 26.898 32.236 27.0508C32.899 27.1931 33.7359 26.3603 33.9623 24.8903C34.166 23.5497 33.7027 22.2843 32.9467 22.1315C32.8977 22.1221 32.8479 22.1172 32.798 22.117Z" fill="#915C28"/>
    </g>
    </g>
    <path d="M9.8227 23.3052C9.66317 23.7674 9.4548 24.1797 9.19759 24.542L4 22.7484L4.19073 22.1959L6.32644 22.9328L6.33666 22.9033C6.24343 22.7116 6.19217 22.5027 6.18326 22.2767C6.17434 22.0507 6.21111 21.8183 6.29357 21.5797C6.39757 21.2785 6.55171 21.0328 6.756 20.8428C6.96066 20.6515 7.21769 20.5341 7.52709 20.4905C7.83649 20.4468 8.19269 20.4946 8.59587 20.6337C9.23194 20.8532 9.65277 21.1871 9.85836 21.6352C10.0641 22.0835 10.0522 22.6401 9.8227 23.3052ZM9.39816 23.0983C9.55973 22.6303 9.56344 22.2401 9.40949 21.9275C9.25664 21.6155 8.93684 21.3756 8.45027 21.2077C7.97651 21.0443 7.5984 21.0278 7.31593 21.1585C7.03476 21.2896 6.83233 21.5342 6.70883 21.8923C6.63844 22.0962 6.60743 22.3006 6.61579 22.5057C6.62526 22.7113 6.68116 22.9061 6.78349 23.0905L9.01633 23.861C9.17177 23.6398 9.29899 23.3856 9.39816 23.0983Z" fill="#5C596F"/>
    <path d="M8.90917 16.485C9.10882 16.1778 9.30976 15.9496 9.512 15.8003C9.71425 15.6512 9.93432 15.5823 10.1724 15.5938C10.4109 15.607 10.6764 15.7087 10.9693 15.8991L13.0023 17.2206L12.7338 17.6337L12.3518 17.4357L12.3306 17.468C12.3802 17.6684 12.3809 17.8866 12.3326 18.1226C12.2851 18.3578 12.1941 18.5786 12.0598 18.7851C11.9135 19.0102 11.7525 19.1803 11.5768 19.2956C11.4016 19.4098 11.2222 19.4655 11.0384 19.4629C10.8545 19.4603 10.6751 19.4022 10.5004 19.2887C10.2261 19.1105 10.0782 18.8733 10.0573 18.5775C10.0357 18.2799 10.147 17.8976 10.3906 17.4305L10.8536 16.5123L10.6317 16.368C10.4313 16.2378 10.2536 16.1704 10.0985 16.1663C9.94249 16.1613 9.79837 16.2109 9.66633 16.3151C9.53596 16.4189 9.40076 16.5788 9.26055 16.7944C9.16305 16.9445 9.07149 17.1122 8.98587 17.2979C8.90193 17.483 8.83489 17.6719 8.78437 17.8641L8.39902 17.6136C8.44489 17.4329 8.51379 17.2424 8.60609 17.0422C8.69727 16.8412 8.7983 16.6555 8.90917 16.485ZM11.7697 18.4387C11.8832 18.264 11.9601 18.0751 12.0004 17.8716C12.0405 17.6682 12.0373 17.4615 11.9911 17.2516L11.1712 16.7188L10.7242 17.6054C10.5741 17.9083 10.505 18.1507 10.5169 18.3325C10.5295 18.5132 10.6196 18.6581 10.7869 18.7669C10.9596 18.8791 11.1299 18.9093 11.298 18.8577C11.465 18.8055 11.6223 18.6659 11.7697 18.4387Z" fill="#5C596F"/>
    <path d="M14.4423 15.6603L11.7883 12.9773L12.1345 12.6346L12.5137 12.9552L12.5412 12.928C12.5293 12.7087 12.57 12.4859 12.663 12.2593C12.7553 12.0336 12.8855 11.8375 13.0536 11.6711C13.1477 11.5781 13.2473 11.4958 13.3526 11.4245L13.7275 11.8035C13.6345 11.8698 13.5309 11.9594 13.4166 12.0723C13.2651 12.2221 13.1401 12.4069 13.0419 12.6266C12.9427 12.8471 12.9017 13.0679 12.9187 13.2889L14.8578 15.2493L14.4423 15.6603Z" fill="#5C596F"/>
    <path d="M20.3347 11.2642L19.7722 11.623L17.6155 10.9966L16.9443 11.4245L17.8515 12.8474L17.3586 13.1617L14.3376 8.42318L14.8305 8.10895L16.6815 11.0122L17.3466 10.5882L17.6517 8.49913L18.2066 8.14535L17.8755 10.5256L20.3347 11.2642Z" fill="#5C596F"/>
    <path d="M28.2684 8.35333L27.533 4.09639L28.0909 4L28.9672 9.07204L28.364 9.17623L24.444 5.46956L25.1794 9.7265L24.6215 9.82289L23.7453 4.75084L24.3485 4.64666L28.2684 8.35333Z" fill="#5C596F"/>
    <path d="M37.1862 5.03905C36.838 4.95158 36.5654 4.96272 36.3685 5.07248C36.1707 5.18075 36.0283 5.40844 35.941 5.75535L35.8353 6.17618L37.1849 6.5153L37.0672 6.98404L35.7176 6.64511L34.9159 9.83642L34.3506 9.69435L35.1525 6.50304L34.3929 6.31231L34.5106 5.84338L35.2702 6.03411L35.3673 5.64727C35.4888 5.16348 35.7087 4.82957 36.0266 4.64534C36.3457 4.46148 36.7515 4.43121 37.2434 4.5549C37.4241 4.60021 37.6095 4.66205 37.7996 4.74005L37.6819 5.20898C37.5071 5.1347 37.342 5.07805 37.1862 5.03905Z" fill="#5C596F"/>
    <path d="M39.1082 11.4743C38.7735 11.3163 38.5131 11.1155 38.3272 10.872C38.143 10.6278 38.0455 10.342 38.0349 10.0144C38.0247 9.68568 38.1125 9.32465 38.2981 8.93113C38.4812 8.54317 38.7018 8.24955 38.96 8.05028C39.2175 7.85194 39.4996 7.74534 39.8063 7.73011C40.1134 7.71655 40.4356 7.78936 40.7723 7.94833C41.291 8.1931 41.6253 8.5298 41.7756 8.95843C41.9256 9.38705 41.8619 9.89498 41.5847 10.4824C41.4015 10.8704 41.1802 11.1642 40.9205 11.3642C40.6609 11.5642 40.3768 11.6719 40.0685 11.6877C39.7596 11.7018 39.4395 11.6307 39.1082 11.4743ZM39.3113 11.0438C40.0516 11.3933 40.6314 11.124 41.0504 10.2363C41.2701 9.77093 41.3338 9.38761 41.2415 9.08657C41.1492 8.78553 40.9244 8.55078 40.5677 8.38234C40.2119 8.21446 39.8887 8.18994 39.5981 8.3088C39.3069 8.42896 39.0526 8.71941 38.835 9.18054C38.4134 10.0738 38.5722 10.6949 39.3113 11.0438Z" fill="#5C596F"/>
    <path d="M43.3293 14.2143C42.9872 13.9357 42.7939 13.6267 42.7495 13.2874C42.7051 12.9479 42.841 12.5837 43.1575 12.1948L44.659 10.3499L45.1123 10.7189L43.6283 12.5425C43.4101 12.8104 43.3153 13.055 43.3441 13.2758C43.3729 13.4968 43.5018 13.7004 43.731 13.887C43.9029 14.0271 44.0996 14.1311 44.3208 14.1988C44.542 14.2668 44.7684 14.2858 44.9996 14.256L46.7763 12.0732L47.2296 12.4422L44.8473 15.3692L44.4695 15.0617L44.7 14.7114L44.6731 14.6893C44.4352 14.6964 44.2004 14.6585 43.9689 14.576C43.7384 14.4943 43.5252 14.3738 43.3293 14.2143Z" fill="#5C596F"/>
    <path d="M46.19 16.9924L49.2294 14.7552L49.5182 15.1477L49.1954 15.4377L49.2171 15.4673C49.4534 15.5217 49.6757 15.619 49.884 15.7594C50.0924 15.8998 50.2727 16.0736 50.4254 16.2809C50.6876 16.6373 50.7963 16.9864 50.7511 17.3283C50.7069 17.6713 50.4804 17.9932 50.0718 18.294L48.1753 19.6899L47.8287 19.2191L49.7106 17.834C49.9908 17.6277 50.1457 17.4141 50.1749 17.1933C50.2033 16.9716 50.1257 16.7357 49.9418 16.4861C49.8111 16.3084 49.6467 16.1555 49.4489 16.0272C49.2511 15.8989 49.0359 15.8214 48.8032 15.7949L46.5364 17.4632L46.19 16.9924Z" fill="#5C596F"/>
    <path d="M49.5175 22.9449C49.3936 22.6327 49.347 22.3342 49.3776 22.049C49.4077 21.7628 49.5254 21.5011 49.7307 21.2641C49.9359 21.0272 50.2356 20.8303 50.6297 20.6739C51.2483 20.4284 51.7828 20.4082 52.2332 20.6132C52.6841 20.8192 53.0356 21.24 53.288 21.8757C53.3851 22.1207 53.4617 22.3829 53.5174 22.6628L55.2466 21.9765L55.4622 22.5199L50.2388 24.5929L50.0564 24.1332L50.446 23.939L50.4319 23.9031C50.2323 23.8255 50.0532 23.7046 49.8945 23.5408C49.7353 23.3759 49.6098 23.1772 49.5175 22.9449ZM50.0185 22.8765C50.0973 23.0747 50.2089 23.2466 50.3537 23.3922C50.498 23.5367 50.6767 23.6411 50.8895 23.7057L53.0611 22.8438C53.0288 22.5929 52.9595 22.3337 52.8533 22.0659C52.6635 21.5875 52.4085 21.2773 52.0885 21.1354C51.7674 20.9939 51.3687 21.0177 50.8925 21.2066C50.0074 21.5578 49.7162 22.1145 50.0185 22.8765Z" fill="#5C596F"/>
    <path d="M6.02631 39.3803C5.84598 38.8708 5.74235 38.3705 5.71542 37.8795L11.4443 35.8513L11.6596 36.4595L9.30472 37.2934L9.31624 37.3263C9.52907 37.4277 9.71701 37.5731 9.88025 37.7623C10.045 37.9523 10.1741 38.1791 10.2673 38.4424C10.3843 38.7728 10.4196 39.0911 10.3733 39.3973C10.3282 39.7032 10.1869 39.9814 9.94915 40.2321C9.71199 40.4838 9.37158 40.6882 8.92791 40.8452C8.22665 41.0935 7.63292 41.0944 7.14654 40.848C6.65904 40.6019 6.28557 40.1127 6.02631 39.3803ZM6.53758 39.2655C6.72032 39.782 6.98534 40.1224 7.33207 40.2869C7.67972 40.4498 8.12154 40.4364 8.65751 40.2466C9.17974 40.0618 9.51774 39.8159 9.67188 39.5093C9.82547 39.2014 9.83252 38.8506 9.69305 38.4565C9.61375 38.2324 9.49935 38.0344 9.35004 37.8622C9.20109 37.6914 9.01798 37.5612 8.80032 37.4719L6.33961 38.343C6.35948 38.6415 6.42541 38.949 6.53758 39.2655Z" fill="#5C596F"/>
    <path d="M12.4745 42.5883C12.6985 42.9265 12.8413 43.231 12.9032 43.5016C12.9659 43.7716 12.9383 44.0251 12.8203 44.2621C12.7033 44.4983 12.484 44.7231 12.1622 44.9361L9.92746 46.416L9.62605 45.9608L9.9945 45.6617L9.9711 45.6264C9.74546 45.5876 9.52409 45.4917 9.3068 45.3389C9.08896 45.1877 8.9051 44.9987 8.75468 44.7717C8.59032 44.5234 8.4891 44.2853 8.45159 44.0576C8.41222 43.8294 8.43395 43.6225 8.51659 43.4368C8.59942 43.2511 8.73685 43.0947 8.92906 42.9675C9.23048 42.7679 9.53672 42.7231 9.8476 42.833C10.1579 42.9421 10.4967 43.2227 10.8638 43.6749L11.5907 44.5494L11.8344 44.388C12.055 44.2419 12.2017 44.0903 12.2741 43.9336C12.3473 43.7778 12.3601 43.6106 12.3124 43.432C12.2647 43.2533 12.1623 43.0455 12.0054 42.8085C11.8964 42.644 11.7666 42.478 11.6158 42.3103C11.465 42.1426 11.3036 41.9908 11.1314 41.8551L11.5543 41.5748C11.717 41.7007 11.8799 41.8545 12.0429 42.0363C12.2062 42.2163 12.3501 42.4003 12.4745 42.5883ZM9.23345 44.6289C9.3614 44.822 9.51963 44.9832 9.70813 45.1127C9.89738 45.2431 10.1085 45.3311 10.3416 45.3768L11.2412 44.7808L10.5403 43.9354C10.2978 43.6493 10.0825 43.4728 9.8944 43.4063C9.7046 43.3395 9.51833 43.3666 9.33522 43.4877C9.14523 43.6136 9.039 43.7728 9.01672 43.9655C8.9961 44.1585 9.06835 44.3797 9.23345 44.6289Z" fill="#5C596F"/>
    <path d="M11.7209 48.3661L14.6362 45.3833L15.0214 45.7597L14.6754 46.1848L14.7055 46.2144C14.948 46.1977 15.195 46.2387 15.4467 46.3373C15.6974 46.435 15.9165 46.5754 16.1041 46.7587C16.2085 46.8607 16.3012 46.9691 16.3821 47.0844L15.971 47.5051C15.8952 47.402 15.7943 47.2887 15.6681 47.1654C15.4998 47.0009 15.2929 46.8664 15.0472 46.7617C14.8024 46.6562 14.5577 46.6148 14.3127 46.6374L12.1822 48.8172L11.7209 48.3661Z" fill="#5C596F"/>
    <path d="M18.4907 53.3787L17.8663 52.9835L17.4797 50.5324L16.7357 50.0613L15.7386 51.6361L15.1934 51.2911L18.5162 46.043L19.0614 46.3882L17.0258 49.6031L17.7635 50.0702L19.9967 49.3955L20.6118 49.7849L18.0747 50.5718L18.4907 53.3787Z" fill="#5C596F"/>
    <path d="M28 54.9886L28.8385 50.2889L29.4557 50.3991L28.4563 56L27.7904 55.8811L25.1144 50.5543L24.2759 55.2542L23.6588 55.144L24.6581 49.5429L25.3241 49.6618L28 54.9886Z" fill="#5C596F"/>
    <path d="M35.3688 49.3484C34.9814 49.4409 34.7194 49.5917 34.5827 49.8007C34.4447 50.0087 34.4215 50.3047 34.513 50.6886L34.6245 51.1553L36.1211 50.7981L36.2452 51.3183L34.7487 51.6756L35.5928 55.2124L34.9653 55.3622L34.121 51.8255L33.2806 52.0261L33.1564 51.5057L33.9969 51.3051L33.8944 50.8759C33.7665 50.3396 33.812 49.8996 34.0311 49.5563C34.2491 49.2132 34.631 48.9765 35.177 48.8463C35.3761 48.7987 35.5891 48.7649 35.8162 48.7447L35.9404 49.2651C35.731 49.2797 35.5404 49.3076 35.3688 49.3484Z" fill="#5C596F"/>
    <path d="M40.5206 53.5282C40.1465 53.6973 39.7909 53.772 39.4536 53.7521C39.116 53.7339 38.8051 53.6115 38.5212 53.3848C38.2376 53.1591 37.9965 52.8265 37.7974 52.3866C37.6026 51.9555 37.5138 51.56 37.5313 51.1997C37.5491 50.8405 37.662 50.5266 37.87 50.2577C38.0769 49.9894 38.3685 49.7702 38.7449 49.5999C39.3212 49.3394 39.8438 49.2996 40.3127 49.4803C40.7817 49.661 41.1639 50.078 41.4592 50.7313C41.6545 51.1635 41.7435 51.5611 41.726 51.924C41.708 52.2857 41.5947 52.602 41.3862 52.8724C41.1776 53.1428 40.889 53.3614 40.5206 53.5282ZM40.3031 53.0473C41.1273 52.6748 41.3162 51.9949 40.8701 51.0076C40.6353 50.4884 40.3582 50.1597 40.039 50.0217C39.7186 49.8841 39.3602 49.9049 38.9637 50.0841C38.5661 50.2639 38.3135 50.5185 38.2056 50.8483C38.0979 51.1781 38.1601 51.5999 38.3923 52.1136C38.8421 53.1086 39.4791 53.4199 40.3031 53.0473Z" fill="#5C596F"/>
    <path d="M45.624 50.3318C45.2408 50.6336 44.8601 50.7671 44.4818 50.7326C44.1054 50.6982 43.7458 50.4635 43.4032 50.0284L41.7769 47.9631L42.2839 47.564L43.892 49.6061C44.1278 49.9054 44.3683 50.0663 44.6135 50.0886C44.8597 50.1099 45.1103 50.0202 45.3654 49.8193C45.559 49.6668 45.719 49.48 45.8457 49.2586C45.9725 49.0354 46.0478 48.7962 46.0712 48.5406L44.147 46.0968L44.6555 45.6966L47.2358 48.9737L46.8127 49.3069L46.4911 48.9728L46.4608 48.9967C46.4099 49.2551 46.3126 49.4987 46.1683 49.7277C46.024 49.9584 45.8424 50.1597 45.624 50.3318Z" fill="#5C596F"/>
    <path d="M49.0777 46.8645L45.7549 44.3433L46.0806 43.9143L46.4875 44.1653L46.5132 44.1317C46.4968 43.8654 46.5304 43.6002 46.614 43.3359C46.6974 43.07 46.825 42.8237 46.9968 42.5972C47.2924 42.2075 47.6289 41.983 48.0065 41.9234C48.3831 41.863 48.7948 42.0025 49.242 42.3418L51.3157 43.9152L50.9257 44.4292L48.8682 42.8679C48.5616 42.6352 48.2864 42.5389 48.0425 42.5784C47.7994 42.617 47.5741 42.773 47.3667 43.0464C47.2192 43.2407 47.1086 43.4628 47.0343 43.7126C46.9607 43.9614 46.9461 44.214 46.9899 44.4705L49.4677 46.3505L49.0777 46.8645Z" fill="#5C596F"/>
    <path d="M53.2165 39.965C53.0752 40.3084 52.8824 40.5816 52.6386 40.7848C52.3956 40.9883 52.1015 41.1057 51.7559 41.1371C51.4103 41.1685 51.021 41.0949 50.5883 40.9168C49.9073 40.6364 49.4668 40.2418 49.2667 39.7325C49.0656 39.2229 49.1091 38.6186 49.3969 37.9194C49.5084 37.6486 49.6493 37.3805 49.8194 37.1153L47.9188 36.333L48.1645 35.7363L53.9085 38.1008L53.7005 38.6058L53.2408 38.4622L53.2247 38.5012C53.324 38.717 53.3736 38.9509 53.3732 39.2027C53.3742 39.4549 53.3218 39.7089 53.2165 39.965ZM52.7662 39.6345C52.8557 39.4168 52.8987 39.1947 52.8954 38.9681C52.8904 38.7421 52.8289 38.5213 52.7108 38.3057L50.3209 37.3218C50.1539 37.5472 50.01 37.8067 49.8891 38.1003C49.6722 38.6272 49.6363 39.0697 49.7819 39.4278C49.9281 39.7875 50.2629 40.075 50.7864 40.2906C51.7611 40.6917 52.4209 40.4732 52.7662 39.6345Z" fill="#5C596F"/>
    <path d="M4.39798 30.5678C4.39798 29.3675 5.37112 28.3943 6.57139 28.3943C7.77167 28.3943 8.74481 29.3675 8.74462 30.5678C8.74462 31.768 7.77148 32.7412 6.57139 32.7412C5.37112 32.7412 4.39798 31.768 4.39798 30.5678Z" fill="#5C596F"/>
    <path d="M50.7235 30.5678C50.7235 29.3675 51.6966 28.3943 52.8969 28.3943C54.0972 28.3943 55.0703 29.3675 55.0703 30.5678C55.0703 31.768 54.0972 32.7412 52.8969 32.7412C51.6966 32.7412 50.7235 31.768 50.7235 30.5678Z" fill="#5C596F"/>
    <defs>
    <clipPath id="clip0_54_300">
    <rect width="18.3848" height="17.3801" fill="white" transform="translate(20.5387 21.3099)"/>
    </clipPath>
    <clipPath id="clip1_54_300">
    <rect width="18.3848" height="17.3801" fill="white" transform="translate(20.5387 21.3099)"/>
    </clipPath>
    </defs>
        </svg>
        <h1 className='home-center lost-title'>{title}</h1>
        {filters && setFilters && <FilterButton filters={filters} setFilters={setFilters} />}
        </div>
      <div className="spacer" />
      <div className="flex-end padding-top">
      </div>
    </div>
  );
}

