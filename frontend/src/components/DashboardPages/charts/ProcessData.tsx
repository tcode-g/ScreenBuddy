export function ProcessData(input: any[], )
{
    if(!Array.isArray(input)){
        return [];
    }

    if(input.length == 24){
        let data = [
            {
                name: '12AM',
                min: input[0]
            },

            {
                name: '',
                min: input[1]
            },

            {
                name: '',
                min: input[2]
            },

            {
                name: '',
                min: input[3]
            },

            {
                name: '',
                min: input[4]
            },

            {
                name: '',
                min: input[5]
            },

            {
                name: '',
                min: input[6]
            },

            {
                name: '',
                min: input[7]
            },

            {
                name: '',
                min: input[8]
            },

            {
                name: '',
                min: input[9]
            },

            {
                name: '',
                min: input[10]
            },

            {
                name: '',
                min: input[11]
            },

            {
                name: '12PM',
                min: input[12]
            },

            {
                name: '',
                min: input[13]
            },

            {
                name: '',
                min: input[14]
            },

            {
                name: '',
                min: input[15]
            },

            {
                name: '',
                min: input[16]
            },

            {
                name: '',
                min: input[17]
            },

            {
                name: '',
                min: input[18]
            },

            {
                name: '',
                min: input[19]
            },

            {
                name: '',
                min: input[20]
            },

            {
                name: '',
                min: input[21]
            },

            {
                name: '',
                min: input[22]
            },

            {
                name: '12AM',
                min: input[23]
            },
        ]
            return data;
    } else if(input.length == 7){
        const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        // [0, 1, 2, 3, 4, 5, 6] l 7
        // [4, 5, 6, 0, 1, 2, 3]
        const todayIndex = (new Date()).getDay();
        let newDayList = dayList.slice(todayIndex + 1).concat(dayList.slice(0, todayIndex + 1));
        let data = [
            {
                name: `${newDayList[0]}`,
                hours: input[0]
            },
            {
                name: `${newDayList[1]}`,
                hours: input[1]
            },
            {
                name: `${newDayList[2]}`,
                hours: input[2]
            },
            {
                name: `${newDayList[3]}`,
                hours: input[3]
            },
            {
                name: `${newDayList[4]}`,
                hours: input[4]
            },
            {
                name: `${newDayList[5]}`,
                hours: input[5]
            },
            {
                name: `${newDayList[6]}`,
                hours: input[6]
            },

        ];

        return data;
    } else if(input.length == 2){
        
        let data = [
            {
                name: '',
                success: input[0],
                fail: input[1]
            }
        ]
        return data;    
    } else {
        return [];
    }
    
    

}

