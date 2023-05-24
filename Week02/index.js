const IO = require('./IO.JS');

const readlineSync = require('readline-sync');

while(true){
    console.log('\n1. expenditure entry');
    console.log('2. expenditure inquiry');
    console.log('3. expenditure correct');
    console.log('4. expenditure delete');
    console.log('5. exit\n');
    
    let index = readlineSync.question('Enter the menu: ');
    if(index == 1){
        while(true){
            historys = IO.read();
            history = IO.entry();
            if(history == 'end')
                break;
            historys.push(history);
            console.log(history);
            IO.write(historys);
        }
    }
    else if(index == 2){
        historys = IO.read();
        while(true){
            let inquiry = readlineSync.question('select inquiry (1. all  2. category  3. date  4. detail  5. exit): ');
            if(inquiry == 1){
                historys.forEach((value, num) => {
                    console.log(num , value);
                });
            }
            else if(inquiry == 2){
                category_sort = historys.sort((a, b) => a.category < b.category ? -1 : 1);
                console.log(category_sort);
            }
            else if(inquiry == 3){
                date_sort = historys.sort((a, b) => a.date < b.date ? -1 : 1);
                console.log(date_sort);
            }
            else if(inquiry == 4){
                detail_sort = historys.sort((a, b) => a.detial < b.detail ? -1 : 1);
                console.log(detail_sort);
            }
            else if(inquiry == 5){
                break;
            }      
        }
    }
    else if(index == 3){
        while(true){
            historys = IO.read();
            let num = readlineSync.question('what correct num? ');
            if(num == 'end')
                break;
            history = IO.entry();
            historys[num] = history;
            IO.write(historys);
        }   
    }
    else if(index == 4){
        while(true){
            historys = IO.read();
            let num = readlineSync.question('what delete date? ');
            if(num == 'end')
                break;
            historys.splice(num, 1);
            
           IO.write(historys);
        } 
    }
    else if(index == 5)
        break;
}