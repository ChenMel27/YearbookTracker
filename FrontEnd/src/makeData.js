var ids = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
];

var names = [
  "Yoda",
  "Jack Sparrow",
  "Captain Kirk",
  "Spock",
  "Optimus Prime",
  "Gandalf",
  "Inigo Montoya",
  "Magnetov",
  "Tony Stark"
];

var dates = [
  '01/15',
  '02/14',
  '02/20',
  '03/04',
  '03/28',
  '04/19',
  '04/29',
  '05/14',
  '05/31'
];

var begins = [
  '1:30p',
  '3:00p',
  '4:00p',
  '4:30p',
  '5:00p',
  '5:30p',
  '6:00p',
  '6:30p',
  '7:00p'
];

var locations = [
  'Marymoor Park',
  'Skyline Gym',
  'Bellevue Park',
  'Issaquah Highlands',
  'Fall City High School',
  'Sammamish Commons',
  'Eastside Catholic',
  'Eastlake',
  'Enumclaw'
];

var student_list = [
'Tom, Jim',
'Emma, Scott',
'Melanie, Emily',
'Bill, Lara',
'TBD',
'Charles',
'Jana, Jake',
'Aldo, Fredo',
'Nobody'
];

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}


const newEvent = (d) => {
  return {
      id: ids[d],
      name: names[d],
      date: dates[d],
      begin: begins[d],
      location: locations[d],
      students: student_list[d],
  }
}

export default function makeData(my_items,...lens) {
  var my_ids = [];
  var my_names = [];
  var my_dates = [];
  var my_begins = [];
  var my_locations = [];
  var my_students = [];

  for (var i in my_items) {  
      my_ids.push(my_items[i].id);
      my_names.push(my_items[i].name);
      my_dates.push(my_items[i].date);
      my_begins.push(my_items[i].begin);
      my_locations.push(my_items[i].location);
      my_students.push(my_items[i].students);
  }

  ids = my_ids;
  names = my_names;
  dates = my_dates;
  begins = my_begins;
  locations = my_locations;
  student_list = my_students;

  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newEvent(d),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
