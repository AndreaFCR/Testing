import React from "react";
import ReactDom from "react-dom";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App, { Todo, TodoForm, useTodos } from "./App"; //importamos también la función Todo de app, hay que exportarla primero

configure({ adapter: new Adapter() });

describe("App", () => {
  describe("Todo", () => {
    //   probamos que funcione al clickar en complete se lance la función completeTodo y que no lo haga la función removeTodo. Hemos creado mocks.
    it("ejecuta completeTodo cuando clickeo Complete", () => {
      const completeTodo = jest.fn(); //esto es un mock al que llamamos completeTodo
      const removeTodo = jest.fn(); //esto es un mock al que llamamos removeTodo
      const index = 5;
      const todo = {
        isCompleted: true,
        text: "lala",
      };
      const wrapper = shallow(
        <Todo
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          index={index}
          todo={todo}
        />
      );
      wrapper.find("button").at(0).simulate("click");

      expect(completeTodo.mock.calls).toEqual([[5]]);
      expect(removeTodo.mock.calls).toEqual([]);
    });

    it("ejecuta removeTodo cuando clickeo X", () => {
      //   probamos que funcione al clickar en complete se lance la función completeTodo y que no lo haga la función removeTodo. Hemos creado mocks.
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;
      const todo = {
        isCompleted: true,
        text: "lala",
      };
      const wrapper = shallow(
        <Todo
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          index={index}
          todo={todo}
        />
      );
      wrapper.find("button").at(1).simulate("click");

      expect(removeTodo.mock.calls).toEqual([[5]]);
      expect(completeTodo.mock.calls).toEqual([]);
    });
  });

  describe("todoForm", () => {
    it("llamar a addTodo cuando el formulario cambie de valor", () => {
      const addTodo = jest.fn();
      const prevent = jest.fn();
      const wrapper = shallow(<TodoForm addTodo={addTodo} />);
      wrapper
        .find("input")
        .simulate("change", { target: { value: "mi nuevo todo!" } }); //el valor lo ponemos nosotros que es lo que queremos q se testea
      wrapper.find("form").simulate("submit", { preventDefault: prevent }); //esta parte no la entiendo bien, testeamos que funcione el prevent default y por tanto el resultado esperado sea nada.

      expect(addTodo.mock.calls).toEqual([["mi nuevo todo!"]]);
      expect(prevent.mock.calls).toEqual([[]]);
    });
  });

  describe("custom hook: useTodos", () => {
    it("addTodo", () => {
      //definimos un componente de prueba con props
      const Test = (props) => {
        //definimos una nueva constante
        const hook = props.hook();
        //retornamos un div con las propiedades
        return <div {...hook}></div>;
      };
      const wrapper = shallow(<Test hook={useTodos} />);
      let props = wrapper.find("div").props();
      props.addTodo("texto de prueba");
      props = wrapper.find("div").props();
      //   console.log(props);

      expect(props.todos[0]).toEqual({ text: "texto de prueba" });
    });

    it("completeTodo", () => {
      const Test = (props) => {
        //definimos una nueva constante
        const hook = props.hook();
        //retornamos un div con las propiedades
        return <div {...hook}></div>;
      };
      const wrapper = shallow(<Test hook={useTodos} />);
      let props = wrapper.find("div").props();
      props.completeTodo(0);
      props = wrapper.find("div").props();
      //   console.log(props);

      expect(props.todos[0]).toEqual({ text: "Todo 1", isCompleted: true });
    });

    it("removeTodo", () => {
      const Test = (props) => {
        //definimos una nueva constante
        const hook = props.hook();
        //retornamos un div con las propiedades
        return <div {...hook}></div>;
      };
      const wrapper = shallow(<Test hook={useTodos} />);
      let props = wrapper.find("div").props();
      props.removeTodo(0);
      props = wrapper.find("div").props();
      //   console.log(props);

      expect(props.todos).toEqual([
        {
          text: "Todo 2",
          isCompleted: false,
        },
        {
          text: "Todo 3",
          isCompleted: false,
        },
      ]);
    });

    it("App", () => {
      const wrapper = mount(<App />);
      const prevent = jest.fn();
      wrapper
        .find("input")
        .simulate("change", { target: { value: "mi todo!" } });
      wrapper.find("form").simulate("submit"), { preventDefault: prevent };
      const respuesta = wrapper.find(".todo").at(0).text().includes("mi todo!");
      expect(respuesta).toEqual(true);
      expect(prevent.mock.calls).toEqual([]);
    });
  });
});
