using AutoMapper;
using MapacenBackend.Entities;
using MapacenBackend.Exceptions;
using MapacenBackend.Models.ProductDtos;
using Microsoft.EntityFrameworkCore;
using System.Drawing;

namespace MapacenBackend.Services
{
    public interface IProductService
    {
        int CreateProduct(CreateProductDto dto);
        int UpdateProduct(int id, UpdateProductDto dto);
        IEnumerable<ProductDto>? GetAllProducts();
        void DeleteProduct(int id);
    }

    public class ProductService : IProductService
    {
        private readonly MapacenDbContext _dbContext;
        private readonly IMapper _mapper;

        public ProductService(MapacenDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        //TODO można przerobic na async
        public int CreateProduct(CreateProductDto dto)
        {
            if (_dbContext.Products.Any(p => p.Name == dto.Name))
                throw new NotUniqueElementException("Produkt o podanej nazwie już istnieje");

            var path = Path.Combine(Path.GetFullPath("wwwroot"), dto.Image.FileName);
            if (File.Exists(path))
                throw new NotUniqueElementException("Plik o takiej nazwie już istnieje");

            using(var image = Image.FromStream(dto.Image.OpenReadStream()))
            {
                var resized = new Bitmap(image, new Size(170, 125));
                resized.Save(Path.Combine(Path.GetFullPath("wwwroot"), dto.Image.FileName));
            }

            var product = _mapper.Map<Product>(dto);
            _dbContext.Products.Add(product);
            _dbContext.SaveChanges();

            return product.Id;
        }

        public void DeleteProduct(int id)
        {
            var product = _dbContext
                .Products
                .FirstOrDefault(p => p.Id == id)
                ?? throw new NotFoundException("Produkt nie istnieje");

            _dbContext.Remove(product);
            _dbContext.SaveChanges();

            var path = Path.Combine(Path.GetFullPath("wwwroot"), product.ImageName);
            File.Delete(path);
        }

        public IEnumerable<ProductDto>? GetAllProducts()
        {
            var products = _dbContext.Products.Include(p => p.Category).OrderBy(p => p.Name);
            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }


        public int UpdateProduct(int id, UpdateProductDto dto)
        {
            var product = _dbContext.Products.FirstOrDefault(c => c.Id == id);
            if (product == null) throw new NotFoundException("Wybrany produkt nie istnieje");

            product.Name = dto?.Name ?? product.Name;
            product.CategoryId = dto?.CategoryId ?? product.CategoryId;

            _dbContext.SaveChanges();
            return id;
        }

    }

}

