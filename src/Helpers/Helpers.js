class Helpers{
    static appName = "Nuance";
    static localhost = '127.0.0.1:8000';
    static server = 'pricebotapi.martinmobiles.com';
    static basePath = `//${this.localhost}`;
    static apiUrl = `${this.basePath}/api/`;
    
    static authUser = JSON.parse(localStorage.getItem('user')) || {};
    
    static serverImage = (image) => {
        return `${this.basePath}/uploads/${image}`;
    }

    static authHeaders = {
        headers: {
            "Content-Type": 'application/json',
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
    }

    

    static authFileHeaders = {
        headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
    }

    static getItem = (data, isJson = false) => {
        if(isJson){
          return JSON.parse(localStorage.getItem(data));
        }else{
          return localStorage.getItem(data);
        }
    }
  
    static setItem = (key, data, isJson = false) => {
        if(isJson){
          localStorage.setItem(key, JSON.stringify(data));
        }else{
          localStorage.setItem(key, data);
        }
    }

    static toggleCSS() {
        const path = window.location.pathname;
    
        // Assuming you have class names 'main-theme' and 'dashboard-theme' for your CSS links
        const mainCSS = document.getElementsByClassName('main-theme');
        const dashboardCSS = document.getElementsByClassName('dashboard-theme');
    
        if (path.includes('/user') || path.includes('/admin')) {
            // Disable all main theme stylesheets
            for (let i = 0; i < mainCSS.length; i++) {
                mainCSS[i].setAttribute('disabled', 'true');
            }
            // Enable all dashboard theme stylesheets
            for (let i = 0; i < dashboardCSS.length; i++) {
                dashboardCSS[i].removeAttribute('disabled');
            }
        } else {
            // Enable all main theme stylesheets
            for (let i = 0; i < mainCSS.length; i++) {
                mainCSS[i].removeAttribute('disabled');
            }
            // Disable all dashboard theme stylesheets
            for (let i = 0; i < dashboardCSS.length; i++) {
                dashboardCSS[i].setAttribute('disabled', 'true');
            }
        }
    }

    static loadScript(scriptUrl) {
        return new Promise((resolve, reject) => {
            const scriptPath = `/${scriptUrl}`;
            const script = document.createElement('script');
            script.src = scriptPath;
            script.async = true;

            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Script load error: ${scriptPath}`));

            document.body.appendChild(script);
        });
    }

    static formatTime = (date) => {
        // Extract hours and minutes
        let hours = date.getHours();
        let minutes = date.getMinutes();
    
        // Format minutes to always be two digits
        minutes = minutes < 10 ? '0' + minutes : minutes;
    
        // Determine AM or PM
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        // Convert hours to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
    
        return `${hours}:${minutes} ${ampm}`;
    }

    static getTimeDetails = (startDate, endDate) => {
        // Parse the input strings as dates
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        // Format the start and end times
        const startTime = Helpers.formatTime(start);
        const endTime = Helpers.formatTime(end);
    
        // Extract AM/PM from the start time
        const type = startTime.slice(-2);
    
        return {
            start: startTime.slice(0, -3),
            end: endTime.slice(0, -3),
            type
        };
    }

    static currentDate = () => {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const currentDate = `${year}-${month}-${day}`;

        return currentDate;
    }

    static getDates = () => {
        const datesArray = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
    
        for (let i = -4; i <= 4; i++) {
            let date = new Date();
            date.setDate(today.getDate() + i);
            date.setHours(0, 0, 0, 0); // Set to start of the day in local time
    
            // Set fullDate to the current date
            // const fullDate = date.toISOString().split('T')[0];
            let localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            // console.log(date, localDate);
            const fullDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const shortDayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
            // Set day start and end times in UTC
            const dayStart = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
            const dayEnd = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999));
    
            const dateObject = {
                date: dayStart.getUTCDate(),
                day: dayNames[dayStart.getUTCDay()],
                short_day: shortDayNames[dayStart.getUTCDay()],
                full_date: localDate,
                // is_active: today.toISOString().split('T')[0] === fullDate,
                is_active: i === 0,
                day_start: dayStart.toISOString(),
                day_end: dayEnd.toISOString()
            };
    
            datesArray.push(dateObject);
        }
    
        return datesArray;
    }    
    
    static isFutureDate = (itemDate) => {
        // Parse the item date and the current date
        const itemDateTime = new Date(itemDate);
        const currentDateTime = new Date();
    
        // Compare the dates
        return itemDateTime > currentDateTime;
    }

    static toastOptions = {
        style: {
            border: '1px solid #14004E',
            padding: '16px',
            color: '#14004E',
        },
    }

    static convertOptions = (data, key) => {
        let options = [];
        data.forEach(result => {
            options.push({label: result[key], value: result.id});
        });

        return options;
    }

    static reactStyles = {
        control: (provided, state) => ({
            ...provided,
            background: '#F9F9F9',
            border: '1px solid #F9F9F9',
            borderRadius: 8,
            padding: '.2rem 0.5rem',
            fontSize: '1.1rem',
            outline: 'none',
            // This will change the border color when the select is focused
            borderColor: state.isFocused ? '#F9F9F9' : "#F9F9F9",
            // This will apply a box shadow color when the select is focused
            boxShadow: state.isFocused ? '0 0 0 1px #7759d2' : provided.boxShadow,
            // This will apply the transition to the border and box-shadow
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
                borderColor: state.isFocused ? '#F9F9F9' : "#F9F9F9", // Replace 'yourHoverColor' with the color you want on hover
            },
        }),
        option: (provided, state) => ({
            ...provided,
            // This will change the background color of the selected option
            backgroundColor: state.isSelected ? '#7759d2' : provided.backgroundColor,
            // This will change the color of the option when it is hovered over
            ':hover': {
                ...provided[':hover'],
                backgroundColor: state.isSelected ? '#7759d2' : '#9474f2',
                color: state.isSelected ? 'white' : 'white',
            },
        }),
    };
}

export default Helpers;