import { DE_Student } from "./DE_Student.js";
import { Student } from "./Student.js";
let jill = new DE_Student(10, "Jill", 4.0);
let jack = new Student(12, "Jack", 4.0);
console.log(jack.getName());
console.log(jack.gpa);
console.log(jack.id);
console.log(jill.getName());
console.log(jill.gpa);
console.log(jill.id);
console.log(jill.getName(), "is enrolled in ", jill['course']);
console.log(jill.getName(), "can you programm? ", jill['canProgram']);
if (jill['canProgram']) {
    console.log(jill.getName(), " do programm ");
    jill['program']();
}
else {
    console.log(jill.getName(), " don't worry. ");
}
