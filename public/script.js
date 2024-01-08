const register = () => {
  const url = "http://localhost:5000/api/users/register";
  const body = {
    name: "john",
    lastname: "doe",
    email: "john.doe@web.de",
    phone: "+491764371220",
    gender: "male",
    password: "johndoe123",
  };
  fetchData({ url, body });
};

const login = () => {
  const url = "http://localhost:5000/api/users/login";
  const body = {
    email: "john.doe@web.de",
    password: "johndoe123",
  };
  fetchData({ url, body });
};

const fetchData = ({ url, body }) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response;
    })
    .then((data) => {
      console.log("Response data:", data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};
