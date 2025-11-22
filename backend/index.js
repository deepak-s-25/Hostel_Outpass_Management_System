const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const _ = require("lodash");
const path = require("path");
const multer = require("multer");
const app = express();
const fs = require("fs");
// Specify the absolute path to the public directory
const publicPath = path.join(__dirname, "../public");
const uploadsPath = path.join(publicPath, "uploads");

// Ensure the 'uploads' directory exists
fs.mkdirSync(uploadsPath, { recursive: true });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath); // Specify the directory where you want to save the files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Use a unique filename
  },
});
const upload = multer({ storage: storage });
app.use(cors());
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hostel",
});
db.connect((err) => {
  if (err) {
    console.log(err);
  }
});
app.get("/", (re, res) => {
  return res.json("from backend side");
});
app.get("/tutor", (re, res) => {
  const sql = "SELECT * FROM tutor";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/student", (re, res) => {
  const sql =
    "SELECT student.mobile,student.address,student.p_name,student.id,student.password,student.file,student.name,student.name,tutor.name as tutor_id,warden.name as warden_id,student.rollno FROM student inner join tutor on tutor.id = student.tutor_id inner join warden ON warden.id  = student.warden_id";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post("/getStudent", (re, res) => {
  const id = re.body.id;
  db.query(
    "SELECT student.mobile,student.address,student.p_name,student.id,student.file, student.name as sname,warden.name as warden_id,student.rollno FROM student inner join warden ON warden.id  = student.warden_id where student.tutor_id=?",
    [id],
    (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    }
  );
});
app.post("/getStudentForWarden", (re, res) => {
  const id = re.body.id;
  db.query(
    "SELECT student.mobile,student.address,student.p_name,student.id,student.file,tutor.name as tutorname,student.name,warden.name as warden_id,student.rollno FROM student inner join tutor on tutor.id = student.tutor_id inner join warden ON warden.id  = student.warden_id where student.warden_id=?",
    [id],
    (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    }
  );
});

app.get("/warden", (re, res) => {
  const sql = "SELECT * FROM warden";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post("/addTutor", (res, ress) => {
  const new_name = res.body.name;
  const password = res.body.password;
  const tutor_id = res.body.tutor_id;

  db.query(
    "INSERT INTO tutor (id,name,password,tutor_id) values (?,?,?,?)",
    ["", new_name, password, tutor_id],
    (err, data) => {
      if (err) return ress.send(err);
      return ress.send("success");
    }
  );
});
app.post("/addStudent", upload.single("file"), (req, res) => {
  const {
    name,
    password,
    tutor_id,
    warden_id,
    rollno,
    address,
    mobile,
    p_name,
  } = req.body;
  const file = req.file.filename;
  db.query(
    "INSERT INTO student (id,name,password,tutor_id,warden_id,rollno,file,p_name,mobile,address) values (?,?,?,?,?,?,?,?,?,?)",
    [
      "",
      name,
      password,
      tutor_id,
      warden_id,
      rollno,
      file,
      p_name,
      mobile,
      address,
    ],
    (err, data) => {
      if (err) return res.send(err);
      return res.send("success");
    }
  );
});
app.post("/addRequest", (req, res) => {
  const { reason, destination, from, to, student_id } = req.body;
  db.query(
    "INSERT INTO request (id,reason,destination,student_id,from_date,to_date,t_approve,w_approve) values (?,?,?,?,?,?,?,?)",
    ["", reason, destination, student_id, from, to, "waiting", "waiting"],
    (err, data) => {
      if (err) return res.send(err);
      return res.send("success");
    }
  );
});
app.post("/getPasswaitforTutor", (res, ress) => {
  const id = res.body.id;
  db.query(
    "SELECT *,student.name as sname,request.id as rid,warden.name as wname FROM student inner join warden on warden.id = student.warden_id INNER JOIN request ON request.student_id = student.id where (request.reason = 'OnDuty' OR request.reason = 'Week Day Leave') AND request.t_approve='waiting' AND student.tutor_id=?",
    [id],
    (err, data) => {
      if (err) return ress.send(err);
      return ress.send(data);
    }
  );
});

app.post("/getTutorPassHistory", (res, ress) => {
  const id = res.body.id;
  db.query(
    "SELECT *,student.name as sname,request.id as rid,warden.name as wname FROM student inner join warden on warden.id = student.warden_id INNER JOIN request ON request.student_id = student.id where (request.reason = 'OnDuty' OR request.reason = 'Week Day Leave') AND request.t_approve='approved' AND request.w_approve='approved' AND student.tutor_id=?",
    [id],
    (err, data) => {
      if (err) return ress.send(err);
      return ress.send(data);
    }
  );
});
app.post("/getPasswaitforWarden", (res, ress) => {
  const id = res.body.id;
  db.query(
    "SELECT *,student.name as sname,request.id as rid,warden.name as wname,tutor.name as tname FROM student inner join tutor on tutor.id = student.tutor_id inner join warden on warden.id = student.warden_id INNER JOIN request ON request.student_id = student.id where request.w_approve='waiting' AND student.tutor_id=?",
    [id],
    (err, data) => {
      if (err) return ress.send(err);
      return ress.send(data);
    }
  );
});

app.post("/OutPassHistoryWarden", (res, ress) => {
  const id = res.body.id;
  db.query(
    "SELECT *,student.name as sname,request.id as rid,warden.name as wname,tutor.name as tname FROM student inner join tutor on tutor.id = student.tutor_id inner join warden on warden.id = student.warden_id INNER JOIN request ON request.student_id = student.id where request.w_approve='approved' AND student.tutor_id=?",
    [id],
    (err, data) => {
      if (err) return ress.send(err);
      return ress.send(data);
    }
  );
});

app.post("/getRequestHistory", (res, ress) => {
  const id = res.body.id;
  db.query("SELECT * FROM request where student_id=?", [id], (err, data) => {
    if (err) return ress.send(err);
    return ress.send(data);
  });
});
app.post("/getPdfDetail", (res, ress) => {
  const id = res.body.id;
  db.query(
    "SELECT * FROM request INNER JOIN student ON student.id = request.student_id where request.id=?",
    [id],
    (err, data) => {
      if (err) return ress.send(err);
      return ress.send(data);
    }
  );
});
app.post("/validateWarden", (res, ress) => {
  const warden_id = res.body.warden_id;
  const password = res.body.password;

  db.query(
    "SELECT * FROM warden where war_id=? and password=?",
    [warden_id, password],
    (err, data) => {
      if (err) return ress.send(err);
      return ress.send(data);
    }
  );
});
app.post("/saveTutorApprove", (res, ress) => {
  const id = res.body.rid;
  db.query(
    "UPDATE request set t_approve='approved' where id=?",
    [id],
    (err, data) => {
      if (err) return ress.send(err);
      return ress.send("success");
    }
  );
});
app.post("/saveWardenApprove", (res, ress) => {
  const id = res.body.rid;
  db.query(
    "UPDATE request set w_approve='approved' where id=?",
    [id],
    (err, data) => {
      if (err) return ress.send(err);
      return ress.send("success");
    }
  );
});

app.post("/validateStudent", (res, ress) => {
  const rollno = res.body.rollno;
  const password = res.body.password;

  db.query(
    "SELECT * FROM student where rollno=? and password=?",
    [rollno, password],
    (err, data) => {
      if (err) return ress.send(err);
      return ress.send(data);
    }
  );
});
app.post("/getStudentDetails", (res, ress) => {
  const id = res.body.id;
  db.query(
    "SELECT student.id,student.mobile,student.p_name,student.address,student.file, tutor.name as tutor_id,student.name,warden.name as warden_id,student.rollno FROM student inner join tutor ON tutor.id = student.tutor_id inner join warden ON warden.id  = student.warden_id where student.id=?",
    [id],
    (err, data) => {
      if (err) return ress.json(err);
      return ress.json(data);
    }
  );
});
app.post("/image", upload.single("file"), function (req, res) {
  res.json({});
});

app.post("/validateTutor", (res, ress) => {
  const tutor_id = res.body.tutor_id;
  const password = res.body.password;

  db.query(
    "SELECT * FROM tutor where tutor_id=? and password=?",
    [tutor_id, password],
    (err, data) => {
      if (err) return ress.send(err);
      return ress.send(data);
    }
  );
});
app.post("/addWarden", (res, ress) => {
  const new_name = res.body.name;
  const password = res.body.password;
  const war_id = res.body.war_id;

  db.query(
    "INSERT INTO warden (id,name,password,war_id) values (?,?,?,?)",
    ["", new_name, password, war_id],
    (err, data) => {
      if (err) return ress.send(err);
      return ress.send("success");
    }
  );
});

app.listen(8081, () => {
  console.log("listening");
});
