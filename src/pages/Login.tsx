
import React, { useEffect } from 'react';

const LoginRedirect: React.FC = () => {
  useEffect(() => {
    // Перенаправление на страницу логина
    window.location.href = "http:/*/ui/login";
  }, []);

  return (
    <div>
    </div>
  );
};

export default LoginRedirect;
