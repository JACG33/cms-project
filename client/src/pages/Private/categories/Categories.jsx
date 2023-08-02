import { useEffect, useState } from "react";
import { API_URL, FormCategories } from "../../../config/constans";

const Categories = () => {
  const [form, setForm] = useState(FormCategories);
  const [categories, setCategories] = useState([]);
  const [formType, setFormType] = useState("create");

  const handleChange = (e) => {
    const { name, value } = e.target;

    const slug = value.trim().split(" ").join("-");
    setForm({
      ...form,
      [name]: value,
      slug: slug,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCategories([form]);
    if (formType == "create") {
      try {
        const solic = await fetch(`${API_URL}categories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (!solic.ok) throw await solic.json();

        const json = await solic.json();
        setCategories([
          ...categories,
          {
            ...form,
            id: json.data.id,
          },
        ]);

        console.log(json);
      } catch (error) {
        console.log(error);
      }
    }
    if (formType == "edit") {
      try {
        const solic = await fetch(`${API_URL}categories/0`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (!solic.ok) throw await solic.json();

        const json = await solic.json();
        setCategories(
          categories.map((ele) => {
            if (ele.id == form.id)
              return { ...ele, name: form.name, slug: form.slug };
            return ele;
          })
        );

        console.log(json);
      } catch (error) {
        console.log(error);
      }
    }
    handleReset();
  };

  const handleDelete = async (id) => {
    try {
      const solic = await fetch(`${API_URL}categories/${id}`, {
        method: "DELETE",
      });

      if (!solic.ok) throw await solic.json();

      const json = await solic.json();
      setCategories(
        categories.filter((ele) => {
          if (ele.id != id) return ele;
        })
      );

      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setForm(FormCategories);
    setFormType("create");
  };

  const handleEdit = (e) => {
    setFormType("edit");
    let findCategorie = categories.find((ele) => ele.id == e);
    setForm(findCategorie);
  };

  useEffect(() => {
    if (categories?.length == 0) {
      fetch(`${API_URL}categories`)
        .then((res) => res.json())
        .then((res) => setCategories(res.data));
    }
  }, []);
  return (
    <div className="m-auto grid gap-4 items-center justify-center">
      <h1 className="my-2 text-center text-2xl">Categorias</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="categorie name"
            className="p-2"
          />
          <input
            type="text"
            readOnly
            value={form.slug}
            placeholder="categorie-name"
            className="p-2"
          />
        </div>
        <button type="button" className="btn btn__delete" onClick={handleReset}>
          Cancelar
        </button>
        <button className="btn btn__save" type="submit">
          {formType == "create" ? "Guardar" : "Editar"}
        </button>
      </form>
      <div className="py-6 text-center">
        {categories?.length > 0 ? (
          categories.map((categorie, ind) => (
            <div
              key={ind}
              className="flex justify-evenly items-center gap-2 p-3 hover:bg-neutral-600 transition-all"
            >
              <span>{categorie.name}</span>
              <div className="flex justify-evenly items-center gap-2">
                <button
                  className="btn btn__edit"
                  type="button"
                  onClick={() => handleEdit(categorie.id)}
                >
                  Editar
                </button>

                <button
                  className="btn btn__delete"
                  type="button"
                  onClick={() => handleDelete(categorie.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <span className="text-xl">No hay categorias</span>
        )}
      </div>
    </div>
  );
};

export default Categories;
