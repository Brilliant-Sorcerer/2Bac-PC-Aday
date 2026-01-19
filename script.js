// البيانات الكاملة للطلاب مع المعدلات وأسماء الإنستغرام
const students = [
    { 
        id: 1, 
        name: "أقدور عبدالرحمان", 
        number: 1, 
        instagram: "@abdearahman_oukadour", 
        average: 12.75,
        requiredGrade: 7.50
    },
    { 
        id: 2, 
        name: "اكناو صالح", 
        number: 2, 
        instagram: "@_salah_ag", 
        average: 13.75,
        requiredGrade: 6.25
    },
    { 
        id: 3, 
        name: "كنبوش لحسن", 
        number: 3, 
        instagram: "@kanbouch_lahcen", 
        average: 15.50,
        requiredGrade: 6.25
    },
    { 
        id: 4, 
        name: "بوالزيت ياسين", 
        number: 4, 
        instagram: "@???", 
        average: 12.88,
        requiredGrade: 7.56
    },
    { 
        id: 5, 
        name: "الحسان عادل", 
        number: 5, 
        instagram: "@adiloulhassane", 
        average: 12.75,
        requiredGrade: 8.67
    },
    { 
        id: 6, 
        name: "بوبلي كوثر", 
        number: 6, 
        instagram: "@???", 
        average: 16.46,
        requiredGrade: 4.20
    },
    { 
        id: 7, 
        name: "بوزيت خديجة", 
        number: 7, 
        instagram: "@khv.vvdija", 
        average: 16.50,
        requiredGrade: 3.77
    },
    { 
        id: 8, 
        name: "اكرام خديجة", 
        number: 8, 
        instagram: "@khadija.agrame", 
        average: 16.89,
        requiredGrade: 3.75
    },
    { 
        id: 9, 
        name: "أزيام عبد المالك", 
        number: 9, 
        instagram: "@abdeaziame", 
        average: 16.78,
        requiredGrade: 3.70
    },
    { 
        id: 10, 
        name: "إدبها أيوب", 
        number: 10, 
        instagram: "@ayoub_idbaha", 
        average: 17.50,
        requiredGrade: 3.50
    },
    { 
        id: 11, 
        name: "أضرضور زهير", 
        number: 11, 
        instagram: "@zou_hair_17", 
        average: 13.45,
        requiredGrade: 7.55
    },
    { 
        id: 12, 
        name: "بوهو مصطفي", 
        number: 12, 
        instagram: "@_musvvxha", 
        average: 14.12,
        requiredGrade: 5.20
    },
    { 
        id: 13, 
        name: "إغير أمنة", 
        number: 13, 
        instagram: "@ighir.amina", 
        average: 16.71,
        requiredGrade: 3.80
    }
];

// تاريخ الامتحان الوطني (4 يونيو 2026)
const examDate = new Date("June 4, 2026 09:00:00").getTime();

// تهيئة الموقع عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة التنقل
    initNavigation();
    
    // عرض الطلاب
    renderStudents();
    
    // عرض جدول المعدلات
    renderGradesTable();
    
    // عرض المتصدرين الثلاثة الأوائل
    updateTopStudents();
    
    // تهيئة العد التنازلي
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // تحديث إحصائيات المعدلات
    updateGradesStats();
});

// تهيئة شريط التنقل
function initNavigation() {
    const listItems = document.querySelectorAll('.navigation ul li');
    const pages = document.querySelectorAll('.page');
    
    listItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // إزالة الفئة النشطة من جميع العناصر
            listItems.forEach(li => li.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active-page'));
            
            // إضافة الفئة النشطة للعنصر المحدد
            this.classList.add('active');
            
            // عرض الصفحة المقابلة
            const targetId = this.querySelector('a').getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active-page');
            
            // تحديث المؤشر
            const indicator = document.querySelector('.indicator');
            const navigation = document.querySelector('.navigation');
            
            if (window.innerWidth > 768) {
                indicator.style.transform = `translateY(calc(70px * ${index}))`;
            } else {
                if (navigation.style.height === '350px' || navigation.style.height === '') {
                    indicator.style.transform = `translateY(calc(70px * ${index}))`;
                } else {
                    indicator.style.transform = `translateX(calc(70px * ${index}))`;
                }
            }
        });
    });
}

// عرض الطلاب في الصفحة
function renderStudents() {
    const studentsGrid = document.querySelector('.students-grid');
    studentsGrid.innerHTML = '';
    
    students.forEach(student => {
        const firstLetter = student.name.charAt(0);
        
        const studentCard = document.createElement('div');
        studentCard.className = 'student-card';
        studentCard.innerHTML = `
            <div class="student-avatar">${firstLetter}</div>
            <div class="student-info">
                <h3>${student.name}</h3>
                <p class="student-number">الرقم: ${student.number}</p>
                ${student.instagram ? `
                <a href="https://instagram.com/${student.instagram.substring(1)}" target="_blank" class="instagram-link">
                    <i class="fab fa-instagram"></i> ${student.instagram}
                </a>` : '<p style="color: var(--text-light);">لا يوجد حساب إنستغرام</p>'}
            </div>
        `;
        
        studentsGrid.appendChild(studentCard);
    });
}

// عرض جدول المعدلات
function renderGradesTable() {
    const tableBody = document.getElementById('gradesTableBody');
    tableBody.innerHTML = '';
    
    // ترتيب الطلاب حسب المعدل (تنازلياً)
    const sortedStudents = [...students].sort((a, b) => b.average - a.average);
    
    sortedStudents.forEach(student => {
        // تحديد حالة النجاح
        let status = '';
        let statusClass = '';
        
        if (student.average >= 10) {
            status = 'ناجح';
            statusClass = 'status-success';
        } else if (student.average >= 8) {
            status = 'بحاجة تحسين';
            statusClass = 'status-warning';
        } else {
            status = 'بحاجة جهد';
            statusClass = 'status-danger';
        }
        
        // إنشاء صف في الجدول
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.number}</td>
            <td>${student.name}</td>
            <td>${student.average.toFixed(2)}</td>
            <td>${student.requiredGrade.toFixed(2)}</td>
            <td class="${statusClass}">${status}</td>
        `;
        tableBody.appendChild(row);
    });
}

// تحديث المتصدرين الثلاثة الأوائل
function updateTopStudents() {
    // ترتيب الطلاب حسب المعدل (تنازلياً)
    const sortedStudents = [...students].sort((a, b) => b.average - a.average);
    
    // عرض المتصدرين الثلاثة الأوائل
    const top1 = sortedStudents[0];
    const top2 = sortedStudents[1];
    const top3 = sortedStudents[2];
    
    // تحديث المركز الأول
    document.getElementById('firstLetter1').textContent = top1.name.charAt(0);
    document.getElementById('top1Name').textContent = top1.name;
    document.getElementById('top1Average').textContent = top1.average.toFixed(2);
    
    // تحديث المركز الثاني
    document.getElementById('firstLetter2').textContent = top2.name.charAt(0);
    document.getElementById('top2Name').textContent = top2.name;
    document.getElementById('top2Average').textContent = top2.average.toFixed(2);
    
    // تحديث المركز الثالث
    document.getElementById('firstLetter3').textContent = top3.name.charAt(0);
    document.getElementById('top3Name').textContent = top3.name;
    document.getElementById('top3Average').textContent = top3.average.toFixed(2);
}

// تحديث إحصائيات المعدلات
function updateGradesStats() {
    // حساب إحصائيات الفصل
    const totalStudents = students.length;
    let totalAverage = 0;
    let highestAverage = 0;
    let successCount = 0;
    
    students.forEach(student => {
        totalAverage += student.average;
        highestAverage = Math.max(highestAverage, student.average);
        
        if (student.average >= 10) {
            successCount++;
        }
    });
    
    const classAverage = totalAverage / totalStudents;
    const successRate = (successCount / totalStudents) * 100;
    
    // تحديث عرض الإحصائيات
    document.getElementById('classAverage').textContent = classAverage.toFixed(2);
    document.getElementById('highestAverage').textContent = highestAverage.toFixed(2);
    document.getElementById('successRate').textContent = `${successRate.toFixed(0)}%`;
}

// تحديث العد التنازلي
function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = examDate - now;
    
    // حساب الأيام، الساعات، الدقائق، الثواني
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    // تحديث العرض
    document.getElementById('days').textContent = days < 10 ? `0${days}` : days;
    document.getElementById('hours').textContent = hours < 10 ? `0${hours}` : hours;
    document.getElementById('minutes').textContent = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById('seconds').textContent = seconds < 10 ? `0${seconds}` : seconds;
}