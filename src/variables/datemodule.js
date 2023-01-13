const dateNames=
{
    day:["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado"],
    month:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre', 'Octubre', 'Noviembre','Diciembre'],
    monthMin:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep', 'Oct', 'Nov','Dic'],
};

const years=
{
    getYears:function (n) {
        let years=[];
        let d =new Date();
        let y = d.getFullYear();
        if (n>0){
            for (let i=y; i< (y+n); i++)
            {
                years.push(i);
            }
        } else if (n<0) {
            for (let i=(y+n); i<= y; i++)
            {
                years.push(i);
            }
        }
        return years;
    }
};

const dayOfYear = (date) =>{
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
}

// recibe una fecha format yyyy-mm-dd y retorna un date
const parseDate = (fechastr) => {
    let aux=fechastr.split('-');
    return new Date(Number(aux[0]), Number(aux[1])-1, Number(aux[2]) )
}


export {
    dateNames,
    years,
    dayOfYear,
    parseDate
}