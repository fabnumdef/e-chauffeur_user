import Vue from 'vue';

import {
  Button, Field, Input, Tag, Switch,
} from 'buefy';

const install = (el) => (el.install ? Vue.use(el) : Vue.component(el.name, el));

install(Button);
install(Field);
install(Input);
install(Tag);
install(Switch);
