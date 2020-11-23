from django.db import models

class Paciente(models.Model):
    nombre = models.CharField(max_length=100)
    edad = models.IntegerField()
    telefono = models.CharField(max_length=100)
    direccion = models.CharField(max_length=100)
    def __str__(self):
        return self.nombre

    class Meta:
        ordering = ('nombre',)

class Caso(models.Model):
    enfermedad = models.CharField(max_length=100)
    descripcion = models.TextField(max_length=150)
    pacientes = models.ManyToManyField(Paciente)
    fecha_entrada = models.DateTimeField(blank=True, null=True)
    fecha_salida = models.DateTimeField(blank=True, null=True)
    habitacion = models.TextField(max_length=150)

    def __str__(self):
        return self.enfermedad + " " +self.descripcion

    class Meta:
        ordering = ('enfermedad', 'descripcion',)