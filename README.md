# О проекте
Скрипт для включения в ваш сайт режима слабовидящих.
<a href="https://jamaks.github.io/special-view/demo/">Демо</a>

# Как подключить
1. Для работы скрипта необходимо подключить библиотеку JQuery>1.5
2. Подключить скрипт SpecialView.js
3. Включить скрипт SpecialView.run();

``` html
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <!-- SpecialView -->
    <script  type="text/javascript" src="../dist/specialview.js"></script>

    <script type="text/javascript">
        SpecialView.run();
    </script>
```

4. Привязать класс 'vi-open' к элементу кнопки которая активирует режим для слабовидящих.

``` html

   <a class="vi-open" href="javascript:(0)">Режим для слабовидящих</a>

```
