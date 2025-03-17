import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { productSchema } from "../../../yup/productSchema";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import ProductCardAdmin from "./productcard/ProductCardAdmin";
import axios from "axios";
import { baseApi } from "../../../environment";
import { toast } from "react-toastify";

const ProductAdmin = () => {
  // const nav = useNavigate();
  const [newProd, setNewProd] = useState(false);
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [editProd, setEditProd] = useState(false);
  const [editProdData, setEditProdData] = useState(null); // change to null

  const EditProduct = (productId) => {
    axios
      .get(`${baseApi}/product/one/${productId}`)
      .then((res) => {
        setEditProdData(res.data.singleData);
        setEditProd(true);
        setNewProd(true); // Ensure the form is open for edit

        // Set form values with fetched product data
        Formik.setValues({
          name: res.data.singleData.name,
          title: res.data.singleData.title,
          description: res.data.singleData.description,
          price: res.data.singleData.price,
          color: res.data.singleData.color,
          category: res.data.singleData.category,
          brand: res.data.singleData.brand,
          size: res.data.singleData.size,
          quantity: res.data.singleData.quantity,
        });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  const getAllProducts = () => {
    axios.get(`${baseApi}/product/all`).then((res) => {
      console.log(res.data);
      setProducts(res.data.data);
    });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const deleteProduct = (productId) => {
    if (confirm("Delete this product?")) {
      axios
        .delete(`${baseApi}/product/one/${productId}`)
        .then(() => {
          getAllProducts(); // Refresh the product list
        })
        .catch((err) => {
          console.log("delete error", err);
        });
    }
  };

  const addImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const initialValues = {
    name: "",
    title: "",
    description: "",
    price: 0,
    color: "",
    category: "",
    brand: "",
    size: "",
    quantity: 0,
  };

  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: productSchema,
    onSubmit: (values) => {
      console.log("Product Admin", image, values);
      const fd = new FormData();

      if (image) {
        fd.append("image", image, image.name);
      }
      fd.append("name", values.name);
      fd.append("title", values.title);
      fd.append("description", values.description);
      fd.append("price", values.price);
      fd.append("color", values.color);
      fd.append("category", values.category);
      fd.append("brand", values.brand);
      fd.append("size", values.size);
      fd.append("quantity", values.quantity);

      if (editProd) {
        // Update existing product
        axios
          .put(`${baseApi}/product/update/${editProdData._id}`, fd)
          .then((res) => {
            console.log(res);
            console.log("Update response:", res);
            toast.success("Product updated successfully");
            resetForm();
          })
          .catch((e) => {
            console.log("Update error", e);
            toast.error("Product update failed");
          });
      } else {
        // Create new product
        axios
          .post(`${baseApi}/product/create`, fd)
          .then((res) => {
            console.log("Create response:", res);
            toast.success("Product added successfully");
            getAllProducts(); // Refresh product list
            resetForm();
          })
          .catch((e) => {
            console.log("Create error", e);
            toast.error("Product add failed");
          });
      }
    },
  });

  const resetForm = () => {
    setNewProd(false);
    setEditProd(false);
    setEditProdData(null);
    setImage(null);
    Formik.resetForm();
  };

  return (
    <div>
      <h1>Product Admin</h1>
      {(newProd || editProd) && (
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={Formik.handleSubmit}
        >
          <Typography variant="h3">
            {editProd ? "Edit Product" : "New Product"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                variant="outlined"
                value={Formik.values.name}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.name && Formik.errors.name ? (
                <p className="text-danger">{Formik.errors.name}</p>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="title"
                label="Title"
                variant="outlined"
                value={Formik.values.title}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.title && Formik.errors.title ? (
                <p className="text-danger">{Formik.errors.title}</p>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                variant="outlined"
                value={Formik.values.description}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.description && Formik.errors.description ? (
                <p className="text-danger">{Formik.errors.description}</p>
              ) : null}
            </Grid>
            {!editProd && (
              <Grid item xs={12}>
                <Typography variant="h4">Add Image</Typography>
                <TextField
                  fullWidth
                  type="file"
                  variant="outlined"
                  onChange={addImage}
                  onBlur={Formik.handleBlur}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="price"
                label="Price"
                variant="outlined"
                value={Formik.values.price}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.price && Formik.errors.price ? (
                <p className="text-danger">{Formik.errors.price}</p>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="color"
                label="Color"
                variant="outlined"
                value={Formik.values.color}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.color && Formik.errors.color ? (
                <p className="text-danger">{Formik.errors.color}</p>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="category"
                label="Category"
                variant="outlined"
                value={Formik.values.category}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.category && Formik.errors.category ? (
                <p className="text-danger">{Formik.errors.category}</p>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="quantity"
                label="Quantity"
                variant="outlined"
                value={Formik.values.quantity}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.quantity && Formik.errors.quantity ? (
                <p className="text-danger">{Formik.errors.quantity}</p>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="size"
                label="Size"
                variant="outlined"
                value={Formik.values.size}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.size && Formik.errors.size ? (
                <p className="text-danger">{Formik.errors.size}</p>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="brand"
                label="Brand"
                variant="outlined"
                value={Formik.values.brand}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.brand && Formik.errors.brand ? (
                <p className="text-danger">{Formik.errors.brand}</p>
              ) : null}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
            <Button variant="outlined" onClick={resetForm}>
              Cancel
            </Button>
          </Grid>
        </Box>
      )}
      {!newProd && !editProd && (
        <Button
          variant="contained"
          onClick={() => {
            setNewProd(true);
            setEditProd(false);
            Formik.resetForm(); // Reset form values for new product
          }}
        >
          Add New
        </Button>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {products.map((item) => (
          <ProductCardAdmin
            key={item._id}
            product={item}
            productHandleDelete={deleteProduct}
            productHandleEdit={EditProduct}
          />
        ))}
      </Box>
    </div>
  );
};

export default ProductAdmin;
