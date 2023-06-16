using MapacenBackend.Entities;
using MapacenBackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;

namespace MapacenBackend.Database
{
    public class DatabaseSeeder
    {
        private readonly MapacenDbContext _dbContext;

        public DatabaseSeeder(MapacenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Seed()
        {
            //var pendingMigarations = _dbContext.Database.GetPendingMigrations();

            //if (pendingMigarations != null && pendingMigarations.Any())
            //    _dbContext.Database.Migrate();

            if (_dbContext.Database.CanConnect())
            {
                if (!_dbContext.Counties.Any())
                {
                    var counties = GetCounties();
                    _dbContext.Counties.AddRange(counties);
                    _dbContext.SaveChanges();
                }

                if (!_dbContext.Roles.Any())
                {
                    var roles = GetRoles();
                    _dbContext.Roles.AddRange(roles);
                    _dbContext.SaveChanges();
                }
            }
        }

        private IEnumerable<County> GetCounties()
        {
            var counties = new List<County>();

            //using (var sr = new StreamReader(Path.GetFullPath("Database\\Counties.csv")))
            using (var sr = new StreamReader(@"Counties.csv"))
            {
                while (!sr.EndOfStream)
                {
                    var line = sr.ReadLine();
                    var values = line.Split(';');

                    counties.Add(new County
                    {
                        Name = values[1]
                    });
                }
            }

            return counties;
        }

        private IEnumerable<Role> GetRoles()
        {
            var roles = new List<Role>()
            {
                new Role()
                {
                    Name = "User"
                },

                new Role()
                {
                    Name = "Local Administrator"
                },

                new Role()
                {
                    Name = "Service Administrator"
                }
            };

            return roles;
        }
    }
}
