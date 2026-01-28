// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

//function getLearnerData(course, ag, submissions) 
  // here, we would process this data to achieve the desired result.
 /* const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];

  return result;
}
/*function getLearnerData(course, ag, submissions){

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);*/
//Does the assignemnets belong to this coures
//      *For this I compares line 3 "id: 451' to line 11 "  course_id: 451"
//          *These matche so I move to the next question

//Are there any penalties for late submissions
//      *There is a late submission penalty per SBA handout
//          *deduct 10 percent of the total points possible from their score for that assignment.
//              submission is late (submitted_at is past due_at) Boolean: true/false

// with this information my first step is to use the assignments_id, due_date and points_possible and compare to all the submissions calling out each learner_id

/*const assignmentLookup = AssignmentGroup.assignments.reduce((acc, a) => { acc[a.id] = 
     { due_at: a.due_at, 
       points_possible: a.points_possible 
    };
return acc;
}, {}) ;

//Merging the Arrays
const mergedSubmissions = LearnerSubmissions.filter(sub => assignmentLookup[Number(sub.assignment_id)]).map(sub => {
    const assignment = assignmentLookup[Number(sub.assignment_id)]; 
    return {
        assignment_id: sub.assignment_id,
        learner_id: sub.learner_id,
        due_at: assignment.due_at,
        submitted_at: sub.submission.submitted_at,
        points_possible: assignment.points_possible,
        score: sub.submission.score
    };
})*/

/*first I sperated the information by learner_id to obtain the following informaion: assignment_id-Submitted_date-score*/

const submissionsByLearner = LearnerSubmissions.reduce((acc, entry) => {
  const { learner_id, assignment_id, submission } = entry;

  // Create learner bucket if it doesn't exist
  if (!acc[learner_id]) {
    acc[learner_id] = {};
  }

  // Assign submission under assignment id
  acc[learner_id][assignment_id] = submission;

  return acc;
}, {});

console.log(submissionsByLearner);

/* Next I found out if assignments were on time or late.*/
const submissionsWithOnTime = LearnerSubmissions.map(submission => {
  // 1. Find the assignment that matches this submission
  const assignment = AssignmentGroup.assignments.find(
    a => a.id === submission.assignment_id
  );

  // 2. Convert dates to Date objects
  const dueAt = new Date(assignment.due_at);
  const submittedAt = new Date(submission.submission.submitted_at);

  // 3. Check if submission was on time
  const onTime = submittedAt <= dueAt;

  // 4. Return a NEW object with onTime added
  return {
    ...submission,
    submission: {
      ...submission.submission,
      onTime: onTime
    }
  };
});

console.log(submissionsWithOnTime);

//Now i need to make all the information show into an array for each student//
/*const learnerData = submissionsWithOnTime.reduce((acc, entry) => {
  const {
    learner_id,
    assignment_id,
    submission
  } = entry;

  // 1. Find learner in accumulator
  let learner = acc.find(l => l.learner_id === learner_id);

  // 2. If learner doesn't exist, create it
  if (!learner) {
    learner = {
      learner_id,
      assignments: []
    };
    acc.push(learner);
  }

  // 3. Push assignment submission info
  learner.assignments.push({
    assignment_id,
    submitted_at: submission.submitted_at,
    score: submission.score,
    onTime: submission.onTime
  });

  return acc;
}, []);

console.log(learnerData);*/

/***********************
 * Learner Submissions
 * (your existing data)
 ***********************/
// const LearnerSubmissions = [...]


/***********************
 * 1. Build assignment lookup
 ***********************/
const assignmentLookup = AssignmentGroup.assignments.reduce((acc, assignment) => {
  acc[assignment.id] = assignment;
  return acc;
}, {});

/***********************
 * 2. Add onTime flag
 ***********************/
/*const submissionsWithOnTime = LearnerSubmissions.map(entry => {
  const assignment = assignmentLookup[entry.assignment_id];*/

 /* const dueAt = new Date(assignment.due_at);
  const submittedAt = new Date(entry.submission.submitted_at);*/

  /*return {
    ...entry,
    submission: {
      ...entry.submission,
      onTime: submittedAt <= dueAt
    }
  };
});*/

/***********************
 * 3. Build learner data
 *    + apply late penalty
 ***********************/
/*const learnerData = submissionsWithOnTime.reduce((acc, entry) => {
  const { learner_id, assignment_id, submission } = entry;

  const pointsPossible = assignmentLookup[assignment_id].points_possible;

  const penalty = submission.onTime ? 0 : pointsPossible * 0.10;
  const adjustedScore = Math.max(
    submission.score - penalty,
    0
  );

  let learner = acc.find(l => l.learner_id === learner_id);

  if (!learner) {
    learner = {
      learner_id,
      assignments: []
    };
    acc.push(learner);
  }

  learner.assignments.push({
    assignment_id,
    submitted_at: submission.submitted_at,
    score: adjustedScore,
    onTime: submission.onTime
  });

  return acc;
}, []);*/

/***********************
 * 4. Output result
 ***********************/
/*console.log(learnerData);*/


/*const learnerData = submissionsWithOnTime.reduce((acc, entry) => {
  const { learner_id, assignment_id, submission } = entry;

  // Find learner in accumulator
  let learner = acc.find(l => l.learner_id === learner_id);

  // If learner doesn't exist, create it
  if (!learner) {
    learner = {
      learner_id,
      assignments: []
    };
    acc.push(learner);
  }

  // Find assignment to get points_possible
  const assignment = AssignmentGroup.assignments.find(
    a => a.id === assignment_id
  );

  // Push assignment submission info
  learner.assignments.push({
    assignment_id,
    submitted_at: submission?.submitted_at ?? null,
    score: submission?.score ?? null,
    points_possible: assignment?.points_possible ?? 0,
    onTime: submission?.onTime ?? false
  });

  return acc;
}, []);

console.log(learnerData);*/

/* Now that i was able to add the points_possible to the array. I need to use points possible and score to get the percentagae of each assignment*/

/*const learnerData = (submissionsWithOnTime ?? []).reduce((acc, entry) => {
  const { learner_id, assignment_id, submission } = entry;

  // Find or create learner
  let learner = acc.find(l => l.learner_id === learner_id);

  if (!learner) {
    learner = {
      learner_id,
      assignments: []
    };
    acc.push(learner);
  }

  // Find assignment (force number match)
  const assignment = AssignmentGroup.assignments.find(
    a => a.id === Number(assignment_id)
  );

  // Normalize values
  const score = Number(submission?.score ?? 0);
  const pointsPossible = Number(assignment?.points_possible ?? 0);

  // Calculate percentage safely
  const percentage =
    pointsPossible > 0 ? (score / pointsPossible) * 100 : 0;

  // Push assignment data
  learner.assignments.push({
    assignment_id: Number(assignment_id),
    submitted_at: submission?.submitted_at ?? null,
    score,
    points_possible: pointsPossible,
    percentage,
    onTime: submission?.onTime ?? false
  });

  return acc;
}, []);

console.log(learnerData); */

const learnerData = (submissionsWithOnTime ?? []).reduce((acc, entry) => {
  const { learner_id, assignment_id, submission } = entry;

  // Find or create learner
  let learner = acc.find(l => l.learner_id === learner_id);

  if (!learner) {
    learner = {
      learner_id,
      assignments: [],
      totalScore: 0,       // For calculating average
      totalPoints: 0       // For calculating average
    };
    acc.push(learner);
  }

  // Find assignment (force number match)
  const assignment = AssignmentGroup.assignments.find(
    a => a.id === Number(assignment_id)
  );

  // Normalize values
  const score = Number(submission?.score ?? 0);
  const pointsPossible = Number(assignment?.points_possible ?? 0);

  // Calculate percentage for this assignment
  const percentage =
    pointsPossible > 0 ? (score / pointsPossible) * 100 : 0;

  // Add assignment to learner
  learner.assignments.push({
    assignment_id: Number(assignment_id),
    submitted_at: submission?.submitted_at ?? null,
    score,
    points_possible: pointsPossible,
    percentage,
    onTime: submission?.onTime ?? false
  });

  // Update running totals
  learner.totalScore += score;
  learner.totalPoints += pointsPossible;

  // Calculate average percentage for all assignments submitted
  learner.averagePercentage =
    learner.totalPoints > 0
      ? (learner.totalScore / learner.totalPoints) * 100
      : 0;

  return acc;
}, []);

// Optional: remove helper totals if you want clean output
learnerData.forEach(l => {
  delete l.totalScore;
  delete l.totalPoints;
});

console.log(learnerData);
