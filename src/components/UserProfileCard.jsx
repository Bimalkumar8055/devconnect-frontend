import PropTypes from "prop-types";
import emptyPic from "../assets/emptyPic.png";

const UserProfileCard = ({ userData }) => {
  if (!userData) return <p>No user data available</p>;
  const { firstName, lastName, photoUrl, age, gender, skills, about } = userData;
  return (
    userData && (
      <div className="flex items-center mt-28 w-full justify-center">
        <div className="max-w-xs w-full ">
          <div className="bg-gradient-to-r from-violet-200 to-pink-200 shadow-xl rounded-lg py-3">
            <div className="photo-wrapper p-2">
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src={photoUrl || emptyPic}
                alt="Profile Pic"
              />
            </div>
            <div className="p-2">
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                {firstName} {lastName}
              </h3>
              <div className="text-center text-gray-400 text-xs font-semibold">
                {/* <p>Web Developer</p> */}
                {skills && (
                  <p>Skills : {skills.map((skill) => skill).join(", ")}</p>
                )}
              </div>

              <p className="px-2 text-gray-600 font-semibold">About : {about}</p>
              <table className="text-xs my-3 w-full space-y-2 text-gray-600">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 text-gray-600 font-semibold">
                      Age
                    </td>
                    <td className="px-2 py-2">{age}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-600 font-semibold">
                      Gender
                    </td>
                    <td className="px-2 py-2">{gender}</td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          </div>
        </div>
      </div>
    )
  );
};

// Define PropTypes for validation
UserProfileCard.propTypes = {
  userData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    photoUrl: PropTypes.string,
    age: PropTypes.number,
    gender: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    about: PropTypes.string,
  }).isRequired,
};

export default UserProfileCard;
