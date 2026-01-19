// البيانات الكاملة للطلاب مع المعدلات وأسماء الإنستغرام
const students = [
    { 
        id: 1, 
        name: "أقدور عبدالرحمان", 
        number: 1, 
        instagram: "@akdour_rahman", 
        average: 14.25,
        requiredGrade: 5.50
    },
    { 
        id: 2, 
        name: "اكناو صالح", 
        number: 2, 
        instagram: "@aknaou_saleh", 
        average: 12.75,
        requiredGrade: 7.25
    },
    { 
        id: 3, 
        name: "كنبوش لحسن", 
        number: 3, 
        instagram: "@kenbouch_lahcen", 
        average: 15.50,
        requiredGrade: 4.50
    },
    { 
        id: 4, 
        name: "بوالزيت ياسين", 
        number: 4, 
        instagram: "@boualzit_yassin", 
        average: 11.00,
        requiredGrade: 9.00
    },
    { 
        id: 5, 
        name: "الحسان عادل", 
        number: 5, 
        instagram: "@alhassan_adel", 
        average: 16.75,
        requiredGrade: 3.25
    },
    { 
        id: 6, 
        name: "بوبلي كوثر", 
        number: 6, 
        instagram: "@boubley_kawthar", 
        average: 13.80,
        requiredGrade: 6.20
    },
    { 
        id: 7, 
        name: "بوزيت خديجة", 
        number: 7, 
        instagram: "@bouzit_khadija", 
        average: 14.90,
        requiredGrade: 5.10
    },
    { 
        id: 8, 
        name: "اكرام خديجة", 
        number: 8, 
        instagram: "@ikram_khadija", 
        average: 10.25,
        requiredGrade: 9.75
    },
    { 
        id: 9, 
        name: "أزيام عبد المالك", 
        number: 9, 
        instagram: "@aziam_abdmalek", 
        average: 12.30,
        requiredGrade: 7.70
    },
    { 
        id: 10, 
        name: "إدبها أيوب", 
        number: 10, 
        instagram: "@idbha_ayoub", 
        average: 9.50,
        requiredGrade: 10.50
    },
    { 
        id: 11, 
        name: "أضرضور زهير", 
        number: 11, 
        instagram: "@adradour_zouhair", 
        average: 13.45,
        requiredGrade: 6.55
    },
    { 
        id: 12, 
        name: "بوهو مصطفي", 
        number: 12, 
        instagram: "@bouhou_mustapha", 
        average: 11.80,
        requiredGrade: 8.20
    },
    { 
        id: 13, 
        name: "إغير أمنة", 
        number: 13, 
        instagram: "@ighir_amina", 
        average: 15.20,
        requiredGrade: 4.80
    }
];

// تاريخ الامتحان الوطني (4 يونيو 2026)
const examDate = new Date("June 4, 2026 09:00:00").getTime();

// تهيئة الموقع عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    // إعداد التنقل للجوال
    setupMobileNavigation();
    
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
    
    // التعامل مع تغيير حجم النافذة
    handleResize();
});

// إعداد التنقل للجوال
function setupMobileNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuIcon = document.getElementById('menuIcon');
    
    if (!menuToggle || !mobileNav) return;
    
    // إضافة حدث النقر على زر القائمة
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        
        mobileNav.classList.toggle('hidden');
        mobileNav.classList.toggle('active');
        
        // تغيير الأيقونة
        if (mobileNav.classList.contains('hidden')) {
            menuIcon.className = 'fas fa-bars';
        } else {
            menuIcon.className = 'fas fa-times';
        }
    });
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.add('hidden');
            mobileNav.classList.remove('active');
            menuIcon.className = 'fas fa-bars';
        });
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(event) {
        if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
            mobileNav.classList.add('hidden');
            mobileNav.classList.remove('active');
            menuIcon.className = 'fas fa-bars';
        }
    });
}

// التعامل مع تغيير حجم النافذة
function handleResize() {
    window.addEventListener('resize', function() {
        const mobileNav = document.querySelector('.mobile-nav');
        const menuToggle = document.getElementById('menuToggle');
        const menuIcon = document.getElementById('menuIcon');
        
        if (window.innerWidth > 768) {
            // إخفاء شريط الجوال وزر القائمة للشاشات الكبيرة
            if (mobileNav) {
                mobileNav.classList.add('hidden');
                mobileNav.classList.remove('active');
            }
            if (menuToggle) menuToggle.style.display = 'none';
        } else {
            // إظهار زر القائمة للجوال
            if (menuToggle) {
                menuToggle.style.display = 'flex';
                menuIcon.className = 'fas fa-bars';
            }
        }
    });
}

// تهيئة شريط التنقل
function initNavigation() {
    // شريط التنقل للشاشات الكبيرة
    initDesktopNavigation();
    
    // شريط التنقل للجوال
    initMobileNavigation();
}

function initDesktopNavigation() {
    const listItems = document.querySelectorAll('.desktop-nav ul li');
    const pages = document.querySelectorAll('.page');
    
    if (listItems.length === 0) return;
    
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
            const targetPage = document.getElementById(targetId);
            if (targetPage) targetPage.classList.add('active-page');
            
            // تحديث المؤشر
            updateIndicator(index, 'desktop');
        });
    });
}

function initMobileNavigation() {
    const listItems = document.querySelectorAll('.mobile-nav ul li');
    const pages = document.querySelectorAll('.page');
    
    if (listItems.length === 0) return;
    
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
            const targetPage = document.getElementById(targetId);
            if (targetPage) targetPage.classList.add('active-page');
            
            // تحديث المؤشر
            updateIndicator(index, 'mobile');
            
            // إغلاق القائمة بعد الاختيار (للهواتف فقط)
            if (window.innerWidth <= 768) {
                const mobileNav = document.querySelector('.mobile-nav');
                const menuIcon = document.getElementById('menuIcon');
                if (mobileNav) {
                    mobileNav.classList.add('hidden');
                    mobileNav.classList.remove('active');
                    if (menuIcon) menuIcon.className = 'fas fa-bars';
                }
            }
        });
    });
}

// تحديث المؤشر
function updateIndicator(index, type = 'desktop') {
    const selector = type === 'desktop' ? '.desktop-nav' : '.mobile-nav';
    const indicator = document.querySelector(`${selector} .indicator`);
    
    if (!indicator) return;
    
    if (window.innerWidth > 768) {
        indicator.style.transform = `translateY(calc(70px * ${index}))`;
    } else if (type === 'mobile') {
        const mobileNav = document.querySelector('.mobile-nav');
        if (mobileNav && mobileNav.classList.contains('active')) {
            indicator.style.transform = `translateY(calc(70px * ${index}))`;
        }
    }
}

// عرض الطلاب في الصفحة
function renderStudents() {
    const studentsGrid = document.querySelector('.students-grid');
    if (!studentsGrid) return;
    
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
    if (!tableBody) return;
    
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
    
    // التحقق من وجود العناصر
    const top1Name = document.getElementById('top1Name');
    const top2Name = document.getElementById('top2Name');
    const top3Name = document.getElementById('top3Name');
    
    if (!top1Name || !top2Name || !top3Name) return;
    
    // عرض المتصدرين الثلاثة الأوائل
    const top1 = sortedStudents[0];
    const top2 = sortedStudents[1];
    const top3 = sortedStudents[2];
    
    // تحديث المركز الأول
    document.getElementById('firstLetter1').textContent = top1.name.charAt(0);
    top1Name.textContent = top1.name;
    document.getElementById('top1Average').textContent = top1.average.toFixed(2);
    
    // تحديث المركز الثاني
    document.getElementById('firstLetter2').textContent = top2.name.charAt(0);
    top2Name.textContent = top2.name;
    document.getElementById('top2Average').textContent = top2.average.toFixed(2);
    
    // تحديث المركز الثالث
    document.getElementById('firstLetter3').textContent = top3.name.charAt(0);
    top3Name.textContent = top3.name;
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
    
    // التحقق من وجود العناصر قبل التحديث
    const classAverageElement = document.getElementById('classAverage');
    const highestAverageElement = document.getElementById('highestAverage');
    const successRateElement = document.getElementById('successRate');
    
    if (classAverageElement) classAverageElement.textContent = classAverage.toFixed(2);
    if (highestAverageElement) highestAverageElement.textContent = highestAverage.toFixed(2);
    if (successRateElement) successRateElement.textContent = `${successRate.toFixed(0)}%`;
}

// تحديث العد التنازلي
function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = examDate - now;
    
    // إذا انتهى الوقت
    if (timeRemaining < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    // حساب الأيام، الساعات، الدقائق، الثواني
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    // التحقق من وجود العناصر قبل التحديث
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (daysElement) daysElement.textContent = days < 10 ? `0${days}` : days;
    if (hoursElement) hoursElement.textContent = hours < 10 ? `0${hours}` : hours;
    if (minutesElement) minutesElement.textContent = minutes < 10 ? `0${minutes}` : minutes;
    if (secondsElement) secondsElement.textContent = seconds < 10 ? `0${seconds}` : seconds;
}