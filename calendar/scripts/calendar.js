window.addEventListener('load', () => {
    getUserInfo().then(user => {
        
        const instagram_name = document.getElementById('instagram_name');
        if(instagram_name) instagram_name.innerText = user.instagram;

    })

    const days_container = document.getElementById('days-container');
    if(days_container) {
        showSpinner();
        userGetDays()
            .then(days => {
                console.log({days});

                days = days.sort((a, b) => b.order - a.order);

                const days_a = days.filter(d => d.week_type == 'A');
                const days_b = days.filter(d => d.week_type == 'B');

                days = [...days_b, ...days_a];

                days.forEach(day => {
                    
                    const day_container = document.createElement('div');
                    day_container.classList.add('day-container');

                    const day_header = document.createElement('div');
                    day_container.appendChild(day_header);
                    day_header.classList.add('day-header');

                    const add_button = document.createElement('a');
                    day_header.appendChild(add_button);
                    add_button.classList.add('add-button');
                    add_button.href = `add-lesson.html?day=${day.value}&week_type=${day.week_type}`;
                    add_button.title = 'Aggiungi lezione';

                    const add_icon = document.createElement('img');
                    add_button.appendChild(add_icon);
                    add_icon.src = '../img/add-button.svg';

                    const day_element = document.createElement('a');
                    day_header.appendChild(day_element);
                    day_element.classList.add('day-element');
                    day_element.href = `delete-day.html?day=${day.value}&week_type=${day.week_type}`;

                    
                    const day_name = document.createElement('div');
                    day_element.appendChild(day_name);
                    day_name.classList.add('day-lesson');
                    day_name.innerText = day.display;

                    const day_week_type = document.createElement('div');
                    day_element.appendChild(day_week_type);
                    day_week_type.classList.add('week-lesson');
                    day_week_type.innerText = day.week_type;


                    (day.lessons || []).forEach(lesson => {
  
                        const lesson_container = document.createElement('div');
                        day_container.appendChild(lesson_container);
                        lesson_container.classList.add('lesson-container');

                        const lesson_time = document.createElement('div');
                        lesson_container.appendChild(lesson_time);
                        lesson_time.classList.add('lesson-time');
                        lesson_time.classList.add('noselect');

                        lesson_time.innerText = lesson.start_hour;

                        const lesson_data = document.createElement('div');
                        lesson_container.appendChild(lesson_data);

                        const lesson_name = document.createElement('div');
                        lesson_data.appendChild(lesson_name);
                        lesson_name.classList.add('lesson-name');
                        lesson_name.classList.add('.noselect');
                        lesson_name.innerText = lesson.subject_name;

                        const lesson_detail = document.createElement('div');
                        lesson_data.appendChild(lesson_detail);
                        lesson_detail.classList.add('lesson-detail');

                        const lesson_place = document.createElement('div');
                        lesson_detail.appendChild(lesson_place);
                        lesson_place.classList.add('lesson-place');
                        lesson_place.innerText = lesson.classroom;

                        const remove_button = document.createElement('a');
                        lesson_container.appendChild(remove_button);
                        remove_button.classList.add('remove-button');

                        // remove_button.href = `delete-lesson.html?day=${day.value}&week_type=${day.week_type}&lesson=${lesson.id}`;

                        const img = document.createElement('img');
                        remove_button.appendChild(img);
                        img.src = '../img/remove-button.svg';
                    })



                    days_container.prepend(day_container);
                });
            })
            .finally(() => hideSpinner());
    }

    const delete_day_container = document.querySelector('.delete-day-container');
    if(delete_day_container) {
        const searchParams = new URLSearchParams(location.search);
        const day_search = searchParams.get('day');
        const week_type = searchParams.get('week_type');
        showSpinner();
        userGetDays()
            .then(days => {
                const day = days.find(day => day.value == day_search && day.week_type == week_type);

                const day_lesson = document.getElementById('day-lesson');
                const week_lesson = document.getElementById('week-lesson');

                if(day_lesson) day_lesson.innerText = day.display;
                if(week_lesson) week_lesson.innerText = day.week_type;
                
            })
            .finally(() => hideSpinner());
        const delete_day_submit = document.getElementById('cancel-button');
        if(delete_day_submit) delete_day_submit.addEventListener('click', (e) => {
            e.preventDefault();
            showSpinner();
            getUserInfo()
                .then(user => {
                    user.days = user.days.filter(day => !(day.value == day_search && day.week_type == week_type));
                    updateUserInfo(user)
                        .then(() => {
                            location.replace(HOME_PAGE_URL);
                        })
                        .catch(e => {
                            console.log({e});
                            alert('Errore durante il caricamento dei dati!');
                        })
                        .finally(() => {
                            hideSpinner();
                        });
                })
                .catch((e) => {
                    console.log({e});
                    alert('Errore durante il caricamento dei dati!');
                });
        });

    }

    const add_lesson = document.getElementById('add-lesson');
    if(add_lesson) {
        const searchParams = new URLSearchParams(location.search);
        const day_search = searchParams.get('day');
        const week_type = searchParams.get('week_type');
        const add_lesson_submit = document.getElementById('add-lesson-submit');
        showSpinner();
        userGetDays()
            .then(days => {
                const day = days.find(d => d.value == day_search && d.week_type == week_type);
                if(day) {
                    for(const lesson of day.lessons) {
                        const element = document.querySelector(`*[value="${lesson.start_hour}"]`).setAttribute('disabled', 'disabled');
                    }
                }
            })
            .finally(() => hideSpinner());
        if(add_lesson_submit) add_lesson_submit.addEventListener('click', (e) => {
            e.preventDefault();

            const subject_name = document.getElementById('lesson-name-input').value;
            const classroom = document.getElementById('lesson-place-input').value;

            const start_hour = Array.from(document.querySelectorAll('input[type=radio]')).find(hour => hour.checked).value;

            console.log({subject_name, classroom, start_hour});

            if(subject_name && classroom && start_hour) {
                showSpinner();
                getUserInfo()
                    .then(user => {
                        for(const day of user.days) {
                            if(day.value == day_search && day.week_type == week_type) {
                                day.lessons.push({
                                    subject_name,
                                    classroom,
                                    start_hour
                                });
                            }
                        }
                        updateUserInfo(user)
                            .then(() => {
                                location.replace(HOME_PAGE_URL);
                            })
                            .catch(e => {
                                console.log({e});
                                alert('Errore durante il caricamento dei dati!');
                            })
                            .finally(() => {
                                hideSpinner();
                            });
                    });
            }
        });
    }
});

const add_day_submit = document.getElementById('add-day-submit')
if(add_day_submit) add_day_submit.addEventListener('click', (e) => {
    e.preventDefault();
    const days = Array.from(document.querySelectorAll('.day-selector input[type=checkbox]')).filter(day => day.checked);

    const week_type_element = Array.from(document.querySelectorAll('.frequency-selector input[type=radio]')).find(week => week.checked);
    const week_type = week_type_element ? week_type_element.value : undefined;

    const days_values = [];
    
    if(week_type == 'a' || week_type == 'all') days_values.push(...days.map(day => ({value: day.name, week_type: 'A', order: day.getAttribute('order'), display: day.value, lessons: []})));
    if(week_type == 'b' || week_type == 'all') days_values.push(...days.map(day => ({value: day.name, week_type: 'B', order: day.getAttribute('order'), display: day.value, lessons: []})));

    showSpinner();
    getUserInfo()
        .then(user => {
            if(!user.days) user.days = [];

            const user_days = user.days.map(d => d.value + d.week_type);
            const days_values_filtered = days_values.filter(d => !user_days.includes(d.value + d.week_type));

            user.days.push(...days_values_filtered);
            updateUserInfo(user)
                .then(() => {
                    location.replace(HOME_PAGE_URL);
                })
                .catch((e) => {
                    console.log({e});
                    alert('Errore durante il caricamento dei dati!');
                })
                .finally(() => hideSpinner());
        })
        .catch((e) => {
            console.log({e});
            hideSpinner();
            alert('Errore durante il caricamento dei dati!');
        })
        .finally()
});

function userGetDays() {
    return new Promise(async (resolve, reject) => {
        getUserInfo()
            .then(user => {
                resolve(user.days || []);
            })
            .catch(reject);
    })
}