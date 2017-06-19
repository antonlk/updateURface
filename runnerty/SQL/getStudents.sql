SELECT S.studentId ,S.name, S.surname, S.email , A.code
FROM students S JOIN authorizations A USING (studentId);