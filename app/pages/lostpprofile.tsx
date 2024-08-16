// import React from 'react';


// const LostPetProfile: React.FC = () => {
//     return (
//         <div>
//             <h1>LostPetProfile</h1>
//             {/* Add your signin form here */}
//         </div>
//     );
// };

// export default LostPetProfile;


// // interface DogData {
// //     dog: {
// //       name: string;
// //       lost_at: {
// //         location: string;
// //         distance: string;
// //       };
// //       details: {
// //         breed: string;
// //         sex: string;
// //         color: string;
// //         chip_number: string;
// //         size: string;
// //         collar: string;
// //       };
// //       description: string;
// //       contact: {
// //         name: string;
// //         methods: {
// //           chat: boolean;
// //           call: boolean;
// //         };
// //       };
// //     };
// //   }

// //   const LostPetProfile: React.FC<{ dogData: DogData }> = ({ dogData }) => {
// //     const { name, lost_at, details, description, contact } = dogData.dog;

// //   return (
// //     <div className="lost-pet-profile">
// //       <header>
// //         <button className="back-button">&lt;</button>
// //         <h1>Lost Pet Profile</h1>
// //       </header>
      
      
// //       <h2>{name} <span>Dog</span></h2>
// //       <p>Lost At: {lost_at.location} ({lost_at.distance})</p>
      
// //       <div className="pet-details">
// //         <div>
// //           <p>Breed: {details.breed}</p>
// //           <p>Color: {details.color}</p>
// //           <p>Size: {details.size}</p>
// //         </div>
// //         <div>
// //           <p>Sex: {details.sex}</p>
// //           <p>Chip Number: {details.chip_number}</p>
// //           <p>Collar: {details.collar}</p>
// //         </div>
// //       </div>
      
// //       <p className="description">{description}</p>
      
// //       <footer>
// //         <p>{contact.name}</p>
// //         {contact.methods.chat && <button className="message-button">Message</button>}
// //         {contact.methods.call && <button className="call-button">Call</button>}
// //       </footer>
// //     </div>
// //   );
// // };

// // export default LostPetProfile;